import React from "react";
import { useTranslation } from "react-i18next";

import { usePageContext } from "../hooks";

import Time from "./Time";

// import * as defaultStyles from "./ArticleMeta.module.css";

ArticleMeta.propTypes = {};

export default function ArticleMeta({
  // styles = defaultStyles,
  styles = {},
  // ...restProps
}) {
  const { t } = useTranslation();
  let {
    contentNode: { dateGmt, modifiedGmt, author },
  } = usePageContext();

  return (
    <>
      <div className={styles.metaTime}>
        {t("publishedAt")}
        {`: `}
        <Time
          date={dateGmt}
          format={{
            day: "numeric",
            month: "long",
            year: "numeric",
          }}
        />
      </div>
      <div className={styles.metaTime}>
        {t("updatedAt")}
        {`: `}
        <Time
          date={modifiedGmt}
          format={{
            day: "numeric",
            month: "long",
            year: "numeric",
          }}
        />
      </div>
      {!!author?.node?.name && (
        <div className={styles.metaTime}>
          {t("author")}
          {`: `}
          {author.node.name}
        </div>
      )}
    </>
  );
}
