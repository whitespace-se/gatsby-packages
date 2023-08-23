/** @jsx jsx */
import {
  // css,
  jsx,
  useTheme,
} from "@emotion/react";
import { useThemeProps } from "@wsui/base";
import camelCase from "lodash/fp/camelCase";
import upperFirst from "lodash/fp/upperFirst";

import * as footerBlocks from "./footer-blocks";

function defaultBlockTypeMapping({ blockType }) {
  let componentName = upperFirst(
    camelCase(`Footer ${blockType || "fallback"}Block`),
  );
  // eslint-disable-next-line import/namespace
  return footerBlocks[componentName] || footerBlocks.FooterFallbackBlock;
}

export default function FooterBlockController(props) {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  props = useThemeProps({ props, name: "FooterBlockController" });
  let { block, blockTypeMapping = {}, ...restProps } = props;

  const Component =
    (typeof blockTypeMapping === "function"
      ? blockTypeMapping(block, defaultBlockTypeMapping)
      : block.blockType && blockTypeMapping[block.blockType]) ||
    defaultBlockTypeMapping(block);

  return <Component block={block} {...restProps} />;
}
