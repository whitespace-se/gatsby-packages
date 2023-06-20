/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Clickable, Typography } from "@wsui/base";
import { graphql, useStaticQuery } from "gatsby";

export default function FooterLogo({ link, ...restProps }) {
  link = typeof link === "string" ? { href: link } : link;
  let title = useStaticQuery(graphql`
    query FooterLogoQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)?.site?.siteMetadata?.title;
  return (
    <div {...restProps}>
      <Typography as="div" variant="h2">
        <Clickable
          {...link}
          css={css`
            color: inherit;
            text-decoration: inherit;
          `}
        >
          {title}
        </Clickable>
      </Typography>
    </div>
  );
}
