/** @jsx jsx */
import { jsx } from "@emotion/react";
import {
  Alert,
  MaybeFragment,
  PageGrid,
  PageGridItem,
  TypographyBlock,
} from "@wsui/base";
import { graphql, useStaticQuery } from "gatsby";
import { useState } from "react";

import Html from "./Html.jsx";

export default function AlertBanner({ ...restProps }) {
  const [dismissedBannerIds, setDismissedBannerIds] = useState([]);

  let data = useStaticQuery(graphql`
    query AlertQuery {
      wp {
        alerts(first: 1000) {
          nodes {
            id
            title
            content
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
    return dismissedBannerIds?.find((item) => item === id);
  }

  return (
    <MaybeFragment {...restProps}>
      {alerts
        .filter(({ id }) => !checkForDismissedBanner(id))
        .map(({ id, title, content }) => {
          return (
            <Alert
              key={id}
              // css={{
              //   background: `var(--color-${alertSettingsType})`,
              //   color: `var(--color-${alertSettingsType}-text)`,
              // }}
              title={title}
              onClose={() => {
                dismissAlertBanner(id);
              }}
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
            >
              {/* <Icon name={alertSettingsType} /> */}
              <TypographyBlock>
                <Html>{content}</Html>
              </TypographyBlock>
            </Alert>
          );
        })}
    </MaybeFragment>
  );
}
