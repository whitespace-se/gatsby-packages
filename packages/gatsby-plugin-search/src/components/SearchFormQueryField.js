import { useID, Icon } from "@whitespace/components";
import { visuallyHidden } from "@whitespace/components/dist/utils/styles.module.css";
import cx from "classnames";
import { Field } from "formik";
import React from "react";

import * as styles from "./SearchFormQueryField.module.css";

export default function SearchFormQueryField({
  id,
  label = "Search query",
  submitLabel = "Search",
  ...restProps
}) {
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
