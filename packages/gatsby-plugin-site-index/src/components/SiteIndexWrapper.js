/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import PropTypes from "prop-types";

SiteIndexWrapper.propTypes = { children: PropTypes.node };

export default function SiteIndexWrapper({ children, ...restProps }) {
  return (
    <div
      css={css`
        display: grid;
        gap: 2rem;
      `}
      {...restProps}
    >
      {children}
    </div>
  );
}
