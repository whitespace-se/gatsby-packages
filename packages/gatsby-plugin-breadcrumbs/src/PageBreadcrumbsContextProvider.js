import PropTypes from "prop-types";
import React from "react";

import pageBreadcrumbsContext from "./pageBreadcrumbsContext";

PageBreadcrumbsContextProvider.propTypes = {
  children: PropTypes.node,
  data: PropTypes.shape({
    sitePage: PropTypes.any,
  }),
};

export default function PageBreadcrumbsContextProvider({ children, data }) {
  return (
    <pageBreadcrumbsContext.Provider value={{ data }}>
      {children}
    </pageBreadcrumbsContext.Provider>
  );
}
