/** @jsx jsx */
import { jsx } from "@emotion/react";
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
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";

import { useHTMLProcessor } from "../../hooks/html-processor.js";

function DefaultReadMore({
  ownerState: {
    alertOwnerState: { color },
  },
  children,
  ...restProps
}) {
  return (
    <Fragment>
      {" "}
      <Button
        color={[color, "+100"]}
        style={{
          paddingBlock: 2,
          paddingInline: 3,
          marginBlock: -2,
          marginInlineStart: 2,
        }}
        variant={null}
        {...restProps}
      >
        {children}
      </Button>
    </Fragment>
  );
}

export default function AlertBanner(props) {
  props = useThemeProps({ props, name: "AlertBanner" });
  const { t } = useTranslation();
  let {
    components,
    readMoreText = t(["alertBanner.readMore", "readMore", "Read more…"]),
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
        .map(({ id, excerpt, content, hasPageContent, uri }) => {
          let plainTextExcerpt = getPlainTextExcerpt({ excerpt, content });
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
                <Typography>
                  {plainTextExcerpt}
                  {!!(hasPageContent && uri) && (
                    <ReadMore
                      ownerState={{
                        ...ownerState,
                        alertOwnerState,
                      }}
                      uri={uri}
                    >
                      {readMoreText}
                    </ReadMore>
                  )}
                </Typography>
              )}
            </Alert>
          );
        })}
    </MaybeFragment>
  );
}
