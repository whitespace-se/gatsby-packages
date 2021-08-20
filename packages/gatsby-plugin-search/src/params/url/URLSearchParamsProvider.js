import { useLocation } from "@gatsbyjs/reach-router";
import { useURLParams } from "@whitespace/gatsby-hooks";
import { mapValues, omit } from "lodash-es";
import React from "react";

import context from "../context";

export default function URLSearchParamsProvider({
  urlPattern,
  encodeParam = (value) => value,
  decodeParam = (value) => value,
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
    params: rawURLParams,
    setParams: setURLParams,
    toURL,
    Link,
  } = useURLParams(urlPattern, {});

  const urlParams = mapValues(rawURLParams, decodeParam);

  const params = schema.cast({ ...urlParams, ...forcedParams });

  const setParams = (modifier) => {
    setURLParams((params) => {
      return mapValues(
        omit(
          schema.cast(
            typeof newParams === "function" ? modifier(params) : modifier,
          ),
          Object.keys(forcedParams),
        ),
        encodeParam,
      );
    });
  };

  const value = {
    params,
    urlParams,
    rawURLParams,
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
