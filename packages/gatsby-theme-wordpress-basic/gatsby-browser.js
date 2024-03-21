/* global GATSBY_ROOT_ELEMENT_WRAPPER_PATH */

import React from "react";
import rehypeParse from "rehype-dom-parse";

import { pluginOptionsContext } from "./src/contexts";
import { HTMLProcessorProvider } from "./src/hooks";

// import "./src/index.css";

const RootElementWrapper = require(GATSBY_ROOT_ELEMENT_WRAPPER_PATH).default;

export function wrapRootElement(
  { element },
  { enableSEO, adminIframeUrl, dashboardUrl, editPostUrl },
) {
  return (
    <pluginOptionsContext.Provider
      value={{ enableSEO, adminIframeUrl, dashboardUrl, editPostUrl }}
    >
      <RootElementWrapper>
        <HTMLProcessorProvider rehypeParse={rehypeParse}>
          {element}
        </HTMLProcessorProvider>
      </RootElementWrapper>
    </pluginOptionsContext.Provider>
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
