import React from "react";
import rehypeParse from "rehype-parse";

import { pluginOptionsContext } from "./src/contexts";
import { HTMLProcessorProvider } from "./src/hooks";
import createHTMLProcessor from "./src/utils/html";

import "./src/index.css";

const htmlProcessor = createHTMLProcessor({ rehypeParse });

export const wrapPageElement = ({ element }, { enableSEO }) => {
  return (
    <pluginOptionsContext.Provider value={{ enableSEO }}>
      {element}
    </pluginOptionsContext.Provider>
  );
};

export function wrapRootElement({ element }) {
  return (
    <HTMLProcessorProvider htmlProcessor={htmlProcessor}>
      {element}
    </HTMLProcessorProvider>
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
