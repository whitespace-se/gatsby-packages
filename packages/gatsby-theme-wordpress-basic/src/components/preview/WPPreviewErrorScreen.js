import { css } from "@emotion/react";
import PropTypes from "prop-types";
import React from "react";

import WPPreviewTakeover from "./WPPreviewTakeover";

WPPreviewErrorScreen.propTypes = {
  error: PropTypes.shape({ message: PropTypes.node }),
  label: PropTypes.node,
};

export default function WPPreviewErrorScreen({ error, label }) {
  return (
    <>
      <div>
        <WPPreviewTakeover>
          <span css={css``}>{label}</span>
          <span
            css={css`
              margin-top: 1em;
              background-color: var(--color-error);
              color: var(--color-light);
              border-radius: 0.5rem;
              padding: 1rem;
            `}
          >
            {error.message}
          </span>
        </WPPreviewTakeover>
      </div>
    </>
  );
}
