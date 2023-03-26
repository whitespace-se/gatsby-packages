/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import { PageGrid, useThemeProps } from "@wsui/base";

// import FooterMenu from "./FooterMenu";

export default function Footer(inProps) {
  const { color = "primary.800", ...restProps } = useThemeProps({
    props: inProps,
    name: "Header",
  });
  const theme = useTheme();
  return (
    <PageGrid
      as="footer"
      css={css`
        background: ${theme.getColor(color)};
        color: ${theme.getColor([color, "text"])};
        display: grid;
        padding: 1rem;
        gap: 2rem;
      `}
      {...restProps}
    >
      {/* <FooterMenu /> */}
    </PageGrid>
  );
}
