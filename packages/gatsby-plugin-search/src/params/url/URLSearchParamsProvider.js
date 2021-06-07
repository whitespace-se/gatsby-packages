import { useLocation } from "@gatsbyjs/reach-router";
import { useURLParams } from "@whitespace/gatsby-hooks";
import React from "react";

import context from "../context";

export default function URLSearchParamsProvider({
  urlPattern,
  forcedParams = {},
  schema,
  children,
}) {
  const location = useLocation();

  if (urlPattern == null) {
    urlPattern = location.pathname;
  }

  const { Provider } = context;

  const {
    params: urlParams,
    setParams: setURLParams,
    toURL,
    Link,
  } = useURLParams(urlPattern, {});

  const params = schema.cast({ ...urlParams, ...forcedParams });

  const setParams = (modifier) => {
    setURLParams((params) => {
      return schema.cast(
        typeof newParams === "function" ? modifier(params) : modifier,
      );
    });
  };

  const value = {
    params,
    urlParams,
    forcedParams,
    setParams,
    toURL,
    Link,
    schema,
  };

  return (
    <Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Provider>
  );
}
