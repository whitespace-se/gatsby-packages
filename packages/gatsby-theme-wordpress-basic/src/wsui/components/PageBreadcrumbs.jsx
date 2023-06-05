import usePageBreadcrumbs from "@whitespace/gatsby-plugin-breadcrumbs/src/usePageBreadcrumbs";
import { Breadcrumbs } from "@wsui/base";
import React from "react";

export default function PageBreadcrumbs({
  transformItems = (items) => items,
  ...restProps
}) {
  let { items } = usePageBreadcrumbs({ transformItems });
  return <Breadcrumbs items={items} {...restProps} />;
}
