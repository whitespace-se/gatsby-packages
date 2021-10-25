import { Pagination } from "@whitespace/components";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import useSearch from "../hooks/useSearch";

import * as defaultStyles from "./SearchPagination.module.css";

SearchPagination.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function SearchPagination({
  className,
  styles = defaultStyles,
  ...restProps
}) {
  const { t } = useTranslation();
  const { page, totalPages, toURL, isEmptySearch } = useSearch();
  if (isEmptySearch || !totalPages) {
    return null;
  }
  return (
    <Pagination
      className={clsx(styles.component, className)}
      {...restProps}
      buttonUrl={(page) => toURL({ page: page + 1 })}
      page={(page || 1) - 1}
      totalPages={totalPages}
      t={t}
    />
  );
}
