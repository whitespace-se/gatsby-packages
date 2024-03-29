/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import {
  Alert,
  MaybeFragment,
  PageGrid,
  PageGridItem,
  Typography,
  useThemeProps,
  Button,
  handleComponentsProp,
} from "@wsui/base";
import { graphql, useStaticQuery } from "gatsby";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useHTMLProcessor } from "../../hooks/html-processor.js";

function DefaultReadMore({
  ownerState: {
    alertOwnerState: { color: alertColor },
  },
  children,
  color = "-300",
  ...restProps
}) {
  return (
    <Button
      color={[alertColor, color]}
      style={{
        paddingBlock: 1.5,
        paddingInline: 3,
        marginBlock: -2,
        borderRadius: 1,
      }}
      variant={null}
      {...restProps}
    >
      {children}
    </Button>
  );
}

export default function AlertBanner(props) {
  props = useThemeProps({ props, name: "AlertBanner" });
  const { t } = useTranslation();
  let {
    components,
    readMoreText = t(["alertBanner.readMore", "readMore", "Read more"]),
    ...restProps
  } = props;
  let { ReadMore } = handleComponentsProp(components, {
    ReadMore: DefaultReadMore,
  });
  const { getPlainTextExcerpt } = useHTMLProcessor();
  const [dismissedBannerIds, setDismissedBannerIds] = useState([]);

  let data = useStaticQuery(graphql`
    query AlertQuery {
      wp {
        alerts(first: 1000) {
          nodes {
            id
            ...WP_AlertForBanner
          }
        }
      }
    }
  `);
  let alerts = data.wp?.alerts?.nodes;

  if (alerts?.length === 0) {
    return null;
  }

  function dismissAlertBanner(id) {
    setDismissedBannerIds((dismissedBannerIds) => [...dismissedBannerIds, id]);
  }

  function checkForDismissedBanner(id) {
    return dismissedBannerIds.find((item) => item === id);
  }

  const ownerState = {
    ...restProps,
  };

  return (
    <MaybeFragment>
      {alerts
        .filter(({ id }) => !checkForDismissedBanner(id))
        .map(
          ({
            id,
            excerpt,
            content,
            hasPageContent,
            uri,
            alertSettings: { readMorePage },
          }) => {
            let plainTextExcerpt = getPlainTextExcerpt({ excerpt, content });
            let readMoreProps = { title: readMoreText };
            if (readMorePage) {
              ({ url: uri, ...readMoreProps } = readMorePage);
              hasPageContent = true;
            }
            if (!plainTextExcerpt) return null;
            return (
              <Alert
                key={id}
                onClose={
                  !!id &&
                  (() => {
                    dismissAlertBanner(id);
                  })
                }
                borderRadius={0}
                components={{
                  Inner: ({ children, ...restProps }) => (
                    <PageGrid {...restProps}>
                      <PageGridItem colspan={12}>{children}</PageGridItem>
                    </PageGrid>
                  ),
                }}
                style={{
                  paddingInline: 0,
                }}
                {...restProps}
              >
                {(alertOwnerState) => (
                  <div
                    css={css`
                      display: flex;
                      align-items: center;
                      gap: 1rem;
                      flex-wrap: wrap;
                      justify-content: start;
                    `}
                  >
                    <div
                      css={css`
                        flex-grow: 1;
                        flex-basis: 20ch;
                        max-width: max-content;
                      `}
                    >
                      <Typography>{plainTextExcerpt}</Typography>
                    </div>
                    {!!(hasPageContent && uri) && (
                      <ReadMore
                        ownerState={{
                          ...ownerState,
                          alertOwnerState,
                        }}
                        uri={uri}
                        {...readMoreProps}
                      />
                    )}
                  </div>
                )}
              </Alert>
            );
          },
        )}
    </MaybeFragment>
  );
}
