import { produce } from "immer";

import useSearchParams from "./useSearchParams";

export default function useSearchParam(param) {
  const { params, paramTypes, setParams, forcedParams } = useSearchParams();

  const more = {
    paramType: paramTypes[param],
    isForced: param in forcedParams,
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
