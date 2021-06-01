import React from "react";
import { useTranslation } from "react-i18next";

import { usePageContext, usePageSiblings } from "../hooks";

import BoxNavigation from "./BoxNavigation";

// import * as defaultStyles from "./ArticleSiblingPageNav.module.css";

ArticleSiblingPageNav.propTypes = {};

export default function ArticleSiblingPageNav({
  // styles = defaultStyles,
  styles = {},
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
      className={styles.siblingPages}
      title={t("relatedPages")}
      items={pageSiblings}
      {...restProps}
    />
  );
}
