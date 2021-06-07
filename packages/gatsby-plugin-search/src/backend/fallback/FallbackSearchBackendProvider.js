import React from "react";

import { useSearchParams } from "../../hooks";
import isEmptySearch from "../../utils/isEmptySearch";
import context from "../context";

export default function FallbackSearchBackendProvider({ children }) {
  const { Provider } = context;
  const params = useSearchParams();
  const value = {
    isPending: isEmptySearch(params),
    error: null,
    isError: false,
  };
  return (
    <Provider value={value}>
      {typeof children === "function"
        ? React.createElement(children, value)
        : children}
    </Provider>
  );
}
