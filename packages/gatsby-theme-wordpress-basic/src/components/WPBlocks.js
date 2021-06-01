import React from "react";

import WPBlockController from "./WPBlockController";

export default function WPBlocks({ blocks, ...restProps }) {
  return (
    <>
      {blocks.map((block, index) => {
        return <WPBlockController key={index} block={block} {...restProps} />;
      })}
    </>
  );
}
