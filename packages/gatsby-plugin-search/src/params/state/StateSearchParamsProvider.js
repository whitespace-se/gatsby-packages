import { omit } from "lodash-es";
import PropTypes from "prop-types";
import React, { forwardRef, useMemo, useState } from "react";

import { getSchemaFromParamTypes } from "../../utils";
import context from "../context";

StateSearchParamsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  forcedParams: PropTypes.object,
  schema: PropTypes.shape({
    cast: PropTypes.func.isRequired,
    concat: PropTypes.func.isRequired,
  }),
  paramTypes: PropTypes.object,
  Link: PropTypes.elementType,
};

const toURL = () => null;

const DefaultWrappedLink = forwardRef(function DefaultWrappedLinkWithRef(
  { ...restProps },
  ref,
) {
  return <button ref={ref} {...restProps} />;
});

export default function StateSearchParamsProvider({
  children,
  forcedParams = {},
  schema,
  paramTypes,
  Link: WrappedLink = DefaultWrappedLink,
}) {
  const { Provider } = context;
  const [explicitParams, setExcplicitParams] = useState({});

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
      "No schema or paramTypes props passed to <StateSearchParamsProvider>",
    );
  }

  const params = schema.cast({ ...explicitParams, ...forcedParams });

  const setParams = (modifier) => {
    setExcplicitParams((params) => {
      return omit(
        schema.cast(
          typeof newParams === "function" ? modifier(params) : modifier,
        ),
        Object.keys(forcedParams),
      );
    });
  };

  const Link = useMemo(
    () =>
      // eslint-disable-next-line react/prop-types
      forwardRef(function LinkWithRef({ to, onClick, ...restProps }, ref) {
        return (
          <WrappedLink
            ref={ref}
            onClick={(event) => {
              event.preventDefault();
              setParams(to);
              if (onClick) onClick(event);
            }}
            {...restProps}
          />
        );
      }),
    [setParams, WrappedLink],
  );

  const value = {
    params,
    urlParams: explicitParams,
    explicitParams,
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
