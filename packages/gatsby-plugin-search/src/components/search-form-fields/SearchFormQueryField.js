import { useID, Icon } from "@whitespace/components";
import { visuallyHidden } from "@whitespace/components/dist/utils/styles.module.css";
import cx from "classnames";
import { Field } from "formik";
import PropTypes from "prop-types";
import React from "react";

import { useSearchSettings } from "../../hooks";

import * as styles from "./SearchFormQueryField.module.css";

SearchFormQueryField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.node,
  submitLabel: PropTypes.node,
};

export default function SearchFormQueryField({
  id,
  label,
  submitLabel,
  ...restProps
}) {
  const { searchPlaceholderText, searchLabelText, searchButtonText } =
    useSearchSettings();
  label = label || searchLabelText || "Search query";
  submitLabel = submitLabel || searchButtonText || "Search";
  const generateID = useID();
  return (
    <div className={styles.wrapper}>
      <label
        className={cx(styles.visuallyHidden, visuallyHidden)}
        htmlFor={id || generateID("search-query")}
      >
        {label}
      </label>
      <Field
        type="search"
        name="query"
        id={id || generateID("search-query")}
        className={cx(styles.input)}
        placeholder={searchPlaceholderText}
        {...restProps}
      />
      <button type="submit" className={styles.submit}>
        <div>
          <Icon name="search" className={styles.icon} />
          <span className={visuallyHidden}>{submitLabel}</span>
        </div>
      </button>
    </div>
  );
}
