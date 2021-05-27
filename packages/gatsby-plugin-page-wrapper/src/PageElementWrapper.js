import PropTypes from "prop-types";
import React from "react";

PageElementWrapper.propTypes = {
  children: PropTypes.node,
};

export default function PageElementWrapper({ children }) {
  return <>{children}</>;
}
