import { css } from "@emotion/css";
import PropTypes from "prop-types";
import React from "react";

WPPreviewTakeover.propTypes = { children: PropTypes.node };

export default function WPPreviewTakeover({ children, ...restProps }) {
  return (
    <div
      css={css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: grid;
        align-content: center;
        justify-content: center;
        align-items: center;
        justify-items: center;
        background: #fffc;
        backdrop-filter: blur(10px);
        z-index: 2;
      `}
      {...restProps}
    >
      {children}
    </div>
  );
}
