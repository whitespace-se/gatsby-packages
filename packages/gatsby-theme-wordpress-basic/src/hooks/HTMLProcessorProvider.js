import PropTypes from "prop-types";
import React, { useContext, useRef } from "react";

import {
  htmlProcessorExtensionContext,
  htmlProcessorContext,
} from "../contexts";
import createHTMLProcessor from "../utils/html";

HTMLProcessorProvider.propTypes = {
  rehypeParse: PropTypes.func,
  children: PropTypes.node,
};

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
