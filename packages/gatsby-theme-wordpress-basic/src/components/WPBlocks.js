import PropTypes from "prop-types";
import React from "react";

import WPBlockController from "./WPBlockController";

WPBlocks.propTypes = {
  blocks: PropTypes.array,
};

export default function WPBlocks({ blocks, ...restProps }) {
  return (
    <>
      {blocks.map((block, index) => {
        return <WPBlockController key={index} block={block} {...restProps} />;
      })}
    </>
  );
}
