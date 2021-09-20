import { useLocation } from "@gatsbyjs/reach-router";
import { useURLParams } from "@whitespace/gatsby-hooks";
import { mapValues, omit } from "lodash-es";
import PropTypes from "prop-types";
import React from "react";

import context from "../context";

URLSearchParamsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  decodeParam: PropTypes.func,
  encodeParam: PropTypes.func,
  forcedParams: PropTypes.object,
  schema: PropTypes.shape({
    cast: PropTypes.func.isRequired,
  }).isRequired,
  urlPattern: PropTypes.string,
};

export default function URLSearchParamsProvider({
  children,
  decodeParam = (value) => value,
  encodeParam = (value) => value,
  forcedParams = {},
  schema,
  urlPattern,
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
