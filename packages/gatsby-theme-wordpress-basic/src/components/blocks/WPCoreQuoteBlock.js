import PropTypes from "prop-types";
import React from "react";

import { useHTMLProcessor } from "../../hooks/html-processor";

WPCoreQuoteBlock.propTypes = {
  block: PropTypes.shape({ originalContent: PropTypes.string.isRequired })
    .isRequired,
  contentMedia: PropTypes.arrayOf(PropTypes.object),
};

export default function WPCoreQuoteBlock({ block, contentMedia }) {
  const { processContent } = useHTMLProcessor();
  const content = processContent(block.originalContent, { contentMedia });
  return <>{content}</>;
}
