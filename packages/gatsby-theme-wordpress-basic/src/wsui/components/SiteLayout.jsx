import { css, useTheme } from "@emotion/react";
import { useThemeProps } from "@wsui/base";
import PropTypes from "prop-types";
import React from "react";

// import { usePageContext } from "../hooks";

import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

SiteLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function SiteLayout(props) {
  props = useThemeProps({ props, name: "SiteLayout" });
  const theme = useTheme();
  let { children, footerMargin = 16, headerMargin = [4, 8] } = props;
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
      <Footer
        css={css`
          margin-top: ${theme.getLength(footerMargin)};
        `}
      />
    </div>
  );
}
