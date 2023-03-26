import { css } from "@emotion/react";
import PropTypes from "prop-types";
import React from "react";

// import { usePageContext } from "../hooks";

import Footer from "./Footer";
import Header from "./Header";

SiteLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function SiteLayout({ children }) {
  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: max-content 1fr max-content;
        min-height: 100vh;
      `}
    >
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </div>
  );
}
