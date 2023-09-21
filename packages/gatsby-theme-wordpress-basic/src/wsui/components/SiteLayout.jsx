import { css, useTheme } from "@emotion/react";
import { Section, handleComponentsProp, useThemeProps } from "@wsui/base";
import React from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

// import { usePageContext } from "../hooks";

import AlertBanner from "./AlertBanner.jsx";
import DefaultFooter from "./Footer.jsx";
import DefaultHeader from "./Header.jsx";

export default function SiteLayout(props) {
  const theme = useTheme();
  props = useThemeProps({ props, name: "SiteLayout" });
  let { children, footerMargin = 0, headerMargin = 0, components } = props;
  let { Header, Footer } = handleComponentsProp(components, {
    Header: DefaultHeader,
    Footer: DefaultFooter,
  });
  const { i18n } = useTranslation();

  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: max-content 1fr max-content;
        min-height: 100vh;
      `}
    >
      <Helmet htmlAttributes={{ lang: i18n.language }} />
      <div>
        <AlertBanner />
        <Header
          css={css`
            margin-bottom: ${theme.getLength(headerMargin)};
          `}
        />
      </div>
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
