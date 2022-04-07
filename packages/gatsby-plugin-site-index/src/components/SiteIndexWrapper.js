/** @jsx jsx */
import { jsx } from "@emotion/react";
import { PageGrid } from "@whitespace/components";
import PropTypes from "prop-types";

SiteIndexWrapper.propTypes = { children: PropTypes.node };

export default function SiteIndexWrapper({ children, ...restProps }) {
  return <PageGrid {...restProps}>{children}</PageGrid>;
}
