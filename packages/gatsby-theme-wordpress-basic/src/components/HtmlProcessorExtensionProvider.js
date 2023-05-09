import { mergeWith } from "lodash/fp";
import React, { useContext } from "react";

const mergeAndConcat = mergeWith((a, b) => {
  if (Array.isArray(a)) {
    return a.concat(b);
  }
});

import htmlProcessorExtensionContext from "../contexts/htmlProcessorExtensionContext";

export default function HtmlProcessorExtensionProvider({
  children,
  ...extension
}) {
  let parentExtension = useContext(htmlProcessorExtensionContext);
  const value = mergeAndConcat(parentExtension, extension);
  const { Provider } = htmlProcessorExtensionContext;
  return <Provider value={value}>{children}</Provider>;
}
