import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import { usePageChildren, usePageContext } from "../hooks";

import * as defaultStyles from "./ArticleChildPageNav.module.css";
import BoxNavigation from "./BoxNavigation";

ArticleChildPageNav.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
};

export default function ArticleChildPageNav({
  styles = defaultStyles,
  className,
  ...restProps
}) {
  let {
    contentNode: { id },
    // isPreview,
  } = usePageContext();
  let pageChildren = usePageChildren(id);

  return (
    <BoxNavigation
      className={clsx(styles.component, className)}
      items={pageChildren}
      {...restProps}
    />
  );
}
