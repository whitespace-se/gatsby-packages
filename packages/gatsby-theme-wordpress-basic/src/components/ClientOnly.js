import { useHasMounted } from "@whitespace/gatsby-hooks/src";
import PropTypes from "prop-types";
import React from "react";

ClientOnly.propTypes = {
  fallback: PropTypes.node,
  children: PropTypes.node,
};

export default function ClientOnly({ fallback = null, children }) {
  if (!useHasMounted()) {
    return fallback;
  }
  return <>{children}</>;
}
