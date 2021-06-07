import { produce } from "immer";
import React, { forwardRef, useMemo } from "react";

import useSearchParams from "./useSearchParams";

export default function useSearchParam(param) {
  const [
    params,
    setParams,
    { toURL, registerParamRule, registerParamDefaultValue, Link: WrappedLink },
  ] = useSearchParams();

  const Link = useMemo(
    () =>
      forwardRef(function LinkWithRef({ to, ...restProps }, ref) {
        return (
          <WrappedLink
            ref={ref}
            to={produce((params) => {
              params[param] = typeof to === "function" ? to(params[param]) : to;
            })}
            {...restProps}
          />
        );
      }),
    [param, WrappedLink],
  );

  const more = {
    registerParamRule: (rule) => registerParamRule(param, rule),
    registerParamDefaultValue: (defaultValue) =>
      registerParamDefaultValue(param, defaultValue),
    toURL: (value) =>
      toURL(
        produce((params) => {
          params[param] = value;
        }),
      ),
    Link,
  };

  const setValue = (value) =>
    setParams(
      produce((params) => {
        params[param] = value;
      }),
    );

  Object.assign(setValue, more);

  const tuple = [params[param], setValue, more];

  tuple.setValue = setValue;

  Object.assign(tuple, more);

  return tuple;
}
