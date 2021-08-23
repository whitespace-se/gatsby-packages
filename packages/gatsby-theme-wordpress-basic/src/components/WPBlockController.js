import camelCase from "lodash/camelCase";
import upperFirst from "lodash/upperFirst";
import PropTypes from "prop-types";
import React from "react";

import * as Blocks from "./blocks";

WPBlockController.propTypes = {
  block: PropTypes.shape({
    name: PropTypes.string,
  }),
};

function fromBlockToComponentName(block) {
  return (
    block &&
    block.name &&
    upperFirst(camelCase("w p " + block.name.replace(/\//g, " ") + " block"))
  );
}

export default function WPBlockController({ block, ...restProps }) {
  let componentName = fromBlockToComponentName(block);
  let BlockComponent =
    // eslint-disable-next-line import/namespace
    (componentName && Blocks[componentName]) || Blocks.WPDefaultBlock;
  return (
    <BlockComponent
      block={block}
      componentName={componentName}
      {...restProps}
    />
  );
}
