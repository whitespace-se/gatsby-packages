import { css } from "@emotion/css";
import React from "react";

import WPPreviewTakeover from "./WPPreviewTakeover";

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
