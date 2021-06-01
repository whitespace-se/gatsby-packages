import PropTypes from "prop-types";
import React, { createContext, useContext } from "react";

const htmlProcessorContext = createContext();

HTMLProcessorProvider.propTypes = {
  htmlProcessor: PropTypes.object,
  children: PropTypes.node,
};

export function HTMLProcessorProvider({ htmlProcessor, children }) {
  const { Provider } = htmlProcessorContext;
  return <Provider value={{ htmlProcessor }}>{children}</Provider>;
}

export default htmlProcessorContext;

export function useHTMLProcessor() {
  return useContext(htmlProcessorContext).htmlProcessor;
}
