import React from "react";

import { usePageChildren, usePageContext } from "../hooks";

import BoxNavigation from "./BoxNavigation";

// import * as defaultStyles from "./ArticleChildPageNav.module.css";

ArticleChildPageNav.propTypes = {};

export default function ArticleChildPageNav({
  // styles = defaultStyles,
  styles = {},
  ...restProps
}) {
  let {
    contentNode: { id },
    // isPreview,
  } = usePageContext();
  let pageChildren = usePageChildren(id);

  return (
    <BoxNavigation
      className={styles.childPages}
      items={pageChildren}
      {...restProps}
    />
  );
}
