import { css, useTheme } from "@emotion/react";
import { Section, handleComponentsProp, useThemeProps } from "@wsui/base";
import React from "react";

// import { usePageContext } from "../hooks";

import DefaultFooter from "./Footer.jsx";
import DefaultHeader from "./Header.jsx";

export default function SiteLayout(props) {
  props = useThemeProps({ props, name: "SiteLayout" });
  const theme = useTheme();
  let {
    children,
    footerMargin = 16,
    headerMargin = [8, 16],
    components,
  } = props;
  let { Header, Footer } = handleComponentsProp(components, {
    Header: DefaultHeader,
    Footer: DefaultFooter,
  });
  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: max-content 1fr max-content;
        min-height: 100vh;
      `}
    >
      <Header
        css={css`
          margin-bottom: ${theme.getLength(headerMargin)};
        `}
      />
      <main id="main">{children}</main>
      <Section>
        <Footer
          css={css`
            margin-top: ${theme.getLength(footerMargin)};
          `}
        />
      </Section>
    </div>
  );
}
