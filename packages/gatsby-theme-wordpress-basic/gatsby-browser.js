import React from "react";
import rehypeParse from "rehype-dom-parse";

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

export const onServiceWorkerUpdateReady = () => {
  console.info(
    "This application has been updated. The page will reload now to serve the latest version.",
  );
  window.location.reload();
};

export function shouldUpdateScroll({
  routerProps: { location: newLocation } = {},
  prevRouterProps: { location: prevLocation } = {},
}) {
  return !(
    newLocation &&
    prevLocation &&
    newLocation.pathname === prevLocation.pathname &&
    newLocation.hash === prevLocation.hash
  );
}
