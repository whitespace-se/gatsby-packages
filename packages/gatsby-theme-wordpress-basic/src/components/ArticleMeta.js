import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import { usePageContext } from "../hooks";

import * as defaultStyles from "./ArticleMeta.module.css";
import Time from "./Time";

ArticleMeta.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
};

export default function ArticleMeta({ styles = defaultStyles }) {
  const { t } = useTranslation();
  let {
    contentNode: { dateGmt, modifiedGmt, author },
  } = usePageContext();

  return (
    <>
      <div className={styles.row}>
        <span className={styles.label}>{t("publishedAt")}: </span>
        <Time
          date={dateGmt}
          format={{
            day: "numeric",
            month: "long",
            year: "numeric",
          }}
        />
      </div>
      <div className={styles.row}>
        <span className={styles.label}>{t("updatedAt")}: </span>
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
        <div className={styles.row}>
          <span className={styles.label}>{t("author")}: </span>
          {author.node.name}
        </div>
      )}
    </>
  );
}
