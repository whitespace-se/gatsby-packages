import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import { usePageContext } from "../hooks";

import Footer from "./Footer";
import Header from "./Header";
import PageBreadcrumbs from "./PageBreadcrumbs";
import * as defaultStyles from "./SiteLayout.module.css";

SiteLayout.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function SiteLayout({
  children,
  className,
  styles = defaultStyles,
}) {
  const { contentNode: { isFrontPage } = {} } = usePageContext();
  return (
    <div className={clsx(styles.component, className)}>
      <Header />
      <main className={styles.main} id="main">
        {!isFrontPage && <PageBreadcrumbs className={styles.breadcrumbs} />}
        {children}
      </main>
      <Footer />
    </div>
  );
}
