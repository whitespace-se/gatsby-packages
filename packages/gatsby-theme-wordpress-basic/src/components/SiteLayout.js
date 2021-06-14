import React from "react";

import Header from "./Header";
import PageBreadcrumbs from "./PageBreadcrumbs";

export default function SiteLayout({ children }) {
  return (
    <div>
      <Header />
      <PageBreadcrumbs />
      <main>{children}</main>
    </div>
  );
}
