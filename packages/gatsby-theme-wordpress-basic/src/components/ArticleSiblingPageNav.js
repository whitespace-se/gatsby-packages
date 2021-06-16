import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import { usePageContext, usePageSiblings } from "../hooks";

import * as defaultStyles from "./ArticleSiblingPageNav.module.css";
import BoxNavigation from "./BoxNavigation";

ArticleSiblingPageNav.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
};

export default function ArticleSiblingPageNav({
  styles = defaultStyles,
  className,
  ...restProps
}) {
  const { t } = useTranslation();
  let {
    contentNode: { id },
    // isPreview,
  } = usePageContext();
  let pageSiblings = usePageSiblings(id);

  return (
    <BoxNavigation
      className={clsx(styles.component, className)}
      title={t("relatedPages")}
      items={pageSiblings}
      {...restProps}
    />
  );
}
