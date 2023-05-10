/* global GATSBY_ROOT_ELEMENT_WRAPPER_PATH */

import React from "react";
import rehypeParse from "rehype-parse";

import { pluginOptionsContext } from "./src/contexts";
import { HTMLProcessorProvider } from "./src/hooks";

// import "./src/index.css";

const RootElementWrapper = require(GATSBY_ROOT_ELEMENT_WRAPPER_PATH).default;

export function wrapRootElement({ element }, { enableSEO }) {
  return (
    <pluginOptionsContext.Provider value={{ enableSEO }}>
      <RootElementWrapper>
        <HTMLProcessorProvider rehypeParse={rehypeParse}>
          {element}
        </HTMLProcessorProvider>
      </RootElementWrapper>
    </pluginOptionsContext.Provider>
  );
}

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const headComponents = getHeadComponents();
  headComponents.sort((x, y) => {
    if (x.type === y.type) {
      return 0;
    }
    if (x.type === "style") {
      return 1;
    }
    if (y.type === "style") {
      return -1;
    }
    return 0;
  });
  replaceHeadComponents(headComponents);
};
