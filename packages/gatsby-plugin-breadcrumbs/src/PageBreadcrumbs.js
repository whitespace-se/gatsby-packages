import { Breadcrumbs, withComponentDefaults } from "@whitespace/components";
import PropTypes from "prop-types";
import React from "react";

import usePageBreadcrumbs from "./usePageBreadcrumbs";

PageBreadcrumbs.propTypes = {
  transformItems: PropTypes.func,
};

export default withComponentDefaults(PageBreadcrumbs, "pageBreadcrumbs");

function PageBreadcrumbs({ transformItems = (items) => items, ...restProps }) {
  let { items } = usePageBreadcrumbs({ transformItems });
  return <Breadcrumbs hideDescription={true} items={items} {...restProps} />;
}
