import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import { usePageContext } from "../hooks";

import * as defaultStyles from "./ArticlePublishDate.module.css";
import Time from "./Time";

ArticlePublishDate.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
};

export default function ArticlePublishDate({
  styles = defaultStyles,
  className,
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
      className={clsx(styles.publishedDate, className)}
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
