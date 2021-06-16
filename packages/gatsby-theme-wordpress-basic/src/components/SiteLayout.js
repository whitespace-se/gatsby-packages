import clsx from "clsx";
import React from "react";

import { usePageContext } from "../hooks";

import Footer from "./Footer";
import Header from "./Header";
import PageBreadcrumbs from "./PageBreadcrumbs";
import * as defaultStyles from "./SiteLayout.module.css";

export default function SiteLayout({
  styles = defaultStyles,
  className,
  children,
}) {
  const { contentNode: { isFrontPage } = {} } = usePageContext();
  return (
    <div className={clsx(styles.component, className)}>
      <Header />
      <main className={styles.main}>
        {!isFrontPage && <PageBreadcrumbs className={styles.breadcrumbs} />}
        {children}
      </main>
      <Footer />
    </div>
  );
}
