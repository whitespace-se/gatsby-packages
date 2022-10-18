import merge from "lodash/fp/merge";
import PropTypes from "prop-types";
import React, { useContext } from "react";

import htmlProcessorExtensionContext from "../contexts/htmlProcessorExtensionContext";

HtmlProcessorExtensionProvider.propTypes = {
  children: PropTypes.node,
  extension: PropTypes.object,
};

export default function HtmlProcessorExtensionProvider({
  children,
  extension,
}) {
  const value = merge(useContext(htmlProcessorExtensionContext), extension);
  const { Provider } = htmlProcessorExtensionContext;
  return <Provider value={value}>{children}</Provider>;
}
