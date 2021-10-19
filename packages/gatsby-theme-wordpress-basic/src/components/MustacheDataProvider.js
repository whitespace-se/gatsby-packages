import { merge } from "lodash-es";
import PropTypes from "prop-types";
import React, { useContext } from "react";

import mustacheContext from "../contexts/mustacheContext";

MustacheDataProvider.propTypes = {
  data: PropTypes.object,
  children: PropTypes.node,
};

export default function MustacheDataProvider({ data, children }) {
  let parentData = useContext(mustacheContext);
  return (
    <mustacheContext.Provider value={merge({}, parentData, data)}>
      {children}
    </mustacheContext.Provider>
  );
}
