import { omit } from "lodash-es";
import PropTypes from "prop-types";
import React, { forwardRef, useCallback, useMemo, useState } from "react";

import context from "../context";

StateSearchParamsProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  forcedParams: PropTypes.object,
  schema: PropTypes.shape({
    cast: PropTypes.func.isRequired,
  }).isRequired,
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
  Link: WrappedLink = DefaultWrappedLink,
}) {
  const { Provider } = context;
  const [explicitParams, setExcplicitParams] = useState({});

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
    schema,
  };

  return (
    <Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Provider>
  );
}
