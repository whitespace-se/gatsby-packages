import PropTypes from "prop-types";
import React, { useState } from "react";

import context from "../context";

StateSearchParamsProvider.propTypes = {
  forcedParams: PropTypes.object,
  children: PropTypes.node,
};

export default function StateSearchParamsProvider({
  forcedParams = {},
  children,
}) {
  const { Provider } = context;
  const [params, setParams] = useState({});
  return (
    <Provider value={[{ ...params, ...forcedParams }, setParams]}>
      {children}
    </Provider>
  );
}
