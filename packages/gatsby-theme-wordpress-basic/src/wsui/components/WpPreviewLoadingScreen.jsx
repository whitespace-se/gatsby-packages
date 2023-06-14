import { css } from "@emotion/react";
import PropTypes from "prop-types";
import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

import WpPreviewTakeover from "./WpPreviewTakeover.jsx";

WpPreviewLoadingScreen.propTypes = { label: PropTypes.node };

export default function WpPreviewLoadingScreen({ label }) {
  return (
    <>
      <div>
        <WpPreviewTakeover>
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
        </WpPreviewTakeover>
      </div>
    </>
  );
}
