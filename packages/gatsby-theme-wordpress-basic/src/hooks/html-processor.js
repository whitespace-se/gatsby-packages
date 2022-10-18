import PropTypes from "prop-types";
import React, { createContext, useContext, useRef } from "react";

import { htmlProcessorExtensionContext } from "../contexts";
import createHTMLProcessor from "../utils/html";

const htmlProcessorContext = createContext();

HTMLProcessorProvider.propTypes = {
  rehypeParse: PropTypes.func,
  children: PropTypes.node,
};

export function HTMLProcessorProvider({ rehypeParse, children }) {
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

export default htmlProcessorContext;

export function useHTMLProcessor() {
  return useContext(htmlProcessorContext).htmlProcessor;
}
