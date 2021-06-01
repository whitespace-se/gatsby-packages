import clsx from "clsx";
import React from "react";
import { useTranslation } from "react-i18next";

import { usePageContext } from "../hooks";

import Time from "./Time";

// import * as defaultStyles from "./ArticlePublishDate.module.css";

ArticlePublishDate.propTypes = {};

export default function ArticlePublishDate({
  // styles = defaultStyles,
  styles = {},
  ...restProps
}) {
  const { t } = useTranslation();
  let {
    contentNode: { dateGmt, isFrontPage },
  } = usePageContext();

  if (isFrontPage) {
    return null;
  }

  return (
    <div
      className={clsx(styles.publishedDate)}
      aria-label={t("publishedOn")}
      {...restProps}
    >
      <Time
        date={dateGmt}
        format={{
          day: "numeric",
          month: "long",
          year: "numeric",
        }}
      />
    </div>
  );
}
