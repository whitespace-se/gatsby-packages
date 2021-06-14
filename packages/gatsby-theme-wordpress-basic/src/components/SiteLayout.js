import React from "react";

import { usePageContext } from "../hooks";

import Header from "./Header";
import PageBreadcrumbs from "./PageBreadcrumbs";
import * as defaultStyles from "./SiteLayout.module.css";

export default function SiteLayout({ styles = defaultStyles, children }) {
  const { contentNode: { isFrontPage } = {} } = usePageContext();
  return (
    <div>
      <Header />
      <main className={styles.main}>
        {!isFrontPage && <PageBreadcrumbs className={styles.breadcrumbs} />}
        {children}
      </main>
    </div>
  );
}
