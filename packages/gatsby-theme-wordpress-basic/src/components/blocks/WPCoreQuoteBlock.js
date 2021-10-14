import PropTypes from "prop-types";
import React from "react";

import HTML from "../HTML";

WPCoreQuoteBlock.propTypes = {
  block: PropTypes.shape({ originalContent: PropTypes.string.isRequired })
    .isRequired,
  contentMedia: PropTypes.arrayOf(PropTypes.object),
};

export default function WPCoreQuoteBlock({ block, contentMedia }) {
  return <HTML contentMedia={contentMedia}>{block.originalContent}</HTML>;
}
