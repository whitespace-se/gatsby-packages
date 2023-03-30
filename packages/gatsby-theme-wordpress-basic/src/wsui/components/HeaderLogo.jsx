/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Clickable, Typography } from "@wsui/base";

export default function HeaderLogo({ link, ...restProps }) {
  link = typeof link === "string" ? { href: link } : link;
  return (
    <div {...restProps}>
      <Typography as="div" variant="h1">
        <Clickable
          {...link}
          css={css`
            color: inherit;
            text-decoration: inherit;
          `}
        >
          Municipio
        </Clickable>
      </Typography>
    </div>
  );
}
