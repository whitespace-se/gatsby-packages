import React from "react";

import PageBreadcrumbs from "./PageBreadcrumbs";

export default function SiteLayout({ children }) {
  return (
    <div>
      <PageBreadcrumbs />
      <main>{children}</main>
    </div>
  );
}
