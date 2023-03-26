import React from "react";
import rehypeParse from "rehype-dom-parse";

import { pluginOptionsContext } from "@whitespace/gatsby-theme-wordpress-basic/src/contexts";
import HTMLProcessorProvider from "./HTMLProcessorProvider.jsx";

export default function GatsbyProvider({ children }) {
  return (
    <pluginOptionsContext.Provider value={{ enableSEO: true }}>
      <HTMLProcessorProvider rehypeParse={rehypeParse}>
        {children}
      </HTMLProcessorProvider>
    </pluginOptionsContext.Provider>
  );
}
