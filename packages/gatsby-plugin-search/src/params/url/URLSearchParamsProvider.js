import { useLocation } from "@gatsbyjs/reach-router";
import { useURLParams } from "@whitespace/gatsby-hooks";
import { mapValues, omit } from "lodash-es";
import PropTypes from "prop-types";
import React, { useMemo } from "react";

import { getSchemaFromParamTypes } from "../../utils";
import context from "../context";

URLSearchParamsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  decodeParam: PropTypes.func,
  decodeParams: PropTypes.func,
  encodeParam: PropTypes.func,
  encodeParams: PropTypes.func,
  forcedParams: PropTypes.object,
  schema: PropTypes.shape({
    cast: PropTypes.func.isRequired,
    concat: PropTypes.func.isRequired,
  }),
  paramTypes: PropTypes.object,
  urlPattern: PropTypes.string,
};

export default function URLSearchParamsProvider({
  children,
  decodeParam = (value) => value,
  decodeParams,
  encodeParam = (value) => value,
  encodeParams,
  forcedParams = {},
  schema,
  paramTypes,
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

  decodeParams = decodeParams || ((params) => mapValues(params, decodeParam));
  encodeParams = encodeParams || ((params) => mapValues(params, encodeParam));

  const urlParams = decodeParams(rawURLParams);

  const schemaFromParamTypes = useMemo(
    () => paramTypes && getSchemaFromParamTypes(paramTypes),
    [paramTypes],
  );

  if (schemaFromParamTypes) {
    if (schema) {
      schema = schema.concat(schemaFromParamTypes);
    } else {
      schema = schemaFromParamTypes;
    }
  }

  if (!schema) {
    throw new Error(
      "No schema or paramTypes props passed to <URLSearchParamsProvider>",
    );
  }

  const params = schema.cast({ ...urlParams, ...forcedParams });

  const setParams = (modifier) => {
    setURLParams((params) => {
      return encodeParams(
        omit(
          schema.cast(
            typeof newParams === "function" ? modifier(params) : modifier,
          ),
          Object.keys(forcedParams),
        ),
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
    paramTypes,
    schema,
  };

  return (
    <Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Provider>
  );
}
