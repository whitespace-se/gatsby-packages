import PropTypes from "prop-types";
import React from "react";

import { useHTMLProcessor } from "../../hooks/html-processor";

WPCoreParagraphBlock.propTypes = {
  block: PropTypes.shape({ originalContent: PropTypes.string.isRequired })
    .isRequired,
  contentMedia: PropTypes.arrayOf(PropTypes.object),
};

export default function WPCoreParagraphBlock({ block, contentMedia }) {
  const { processContent } = useHTMLProcessor();
  const content = processContent(block.originalContent, { contentMedia });
  return <>{content}</>;
}
