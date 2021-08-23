import { css } from "@emotion/css";
import PropTypes from "prop-types";
import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

import WPPreviewTakeover from "./WPPreviewTakeover";

WPPreviewLoadingScreen.propTypes = { label: PropTypes.node };

export default function WPPreviewLoadingScreen({ label }) {
  return (
    <>
      <div>
        <WPPreviewTakeover>
          <span
            css={css`
              opacity: 0.25;
            `}
          >
            <PulseLoader size={20} />
          </span>
          <span
            css={css`
              opacity: 0.75;
              margin-top: 1em;
            `}
          >
            {label}
          </span>
        </WPPreviewTakeover>
      </div>
    </>
  );
}
