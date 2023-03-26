import React, { createContext, useContext, useRef } from "react";

import htmlProcessorExtensionContext from "@whitespace/gatsby-theme-wordpress-basic/src/contexts/htmlProcessorExtensionContext";
import htmlProcessorContext from "@whitespace/gatsby-theme-wordpress-basic/src/contexts/htmlProcessorContext";
import createHTMLProcessor from "./html.jsx";

export default function HTMLProcessorProvider({ rehypeParse, children }) {
  const { Provider } = htmlProcessorContext;
  let extensions = useContext(htmlProcessorExtensionContext);
  let htmlProcessorRef = useRef(null);
  if (!htmlProcessorRef.current) {
    htmlProcessorRef.current = createHTMLProcessor({
      rehypeParse,
      ...extensions,
    });
  }
  return (
    <Provider value={{ htmlProcessor: htmlProcessorRef.current }}>
      {children}
    </Provider>
  );
}
