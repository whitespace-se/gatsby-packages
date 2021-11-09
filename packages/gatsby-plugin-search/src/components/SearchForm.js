import clsx from "clsx";
import { Formik, Form } from "formik";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import { useSearch } from "../hooks";

import * as styles from "./SearchForm.module.css";
import SearchFormField from "./SearchFormField";

SearchForm.propTypes = {
  className: PropTypes.string,
  showHitsTotal: PropTypes.bool,
};

export default function SearchForm({
  className,
  showHitsTotal = true,
  ...props
}) {
  const { params, setParams, schema, hits, totalHits } = useSearch();
  const { t } = useTranslation();

  const { query, page, contentType, ...otherFilters } = urlParams;
  const showClearFilter = Object.values(otherFilters).length > 0;

  return (
    <Formik
      initialValues={params}
      enableReinitialize={true}
      validationSchema={schema}
      onSubmit={async (values) => {
        setParams({ ...values, page: null });
      }}
      {...props}
    >
      {({ setFieldValue, submitForm }) => (
        <Form className={clsx(styles.form, className)}>
          <SearchFormField param="query" />
          <SearchFormField param="contentType" />

          <div className={styles.filterContainer}>
            <SearchFormField param="tags" />
            <SearchFormField param="date" />
            {!!(params.tags?.length || params.date?.length) && (
              <button
                className={styles.clearFilter}
                onClick={() => {
                  setFieldValue("tags", null);
                  setFieldValue("date", null);
                  setTimeout(submitForm, 0);
                }}
              >
                {t("clearFilterLabel")}
              </button>
            )}
          </div>
          <div className={styles.sortContainer}>
            <div className={styles.toggleButtonGroupWrapper}>
              <SearchFormField param="sort" />
            </div>
            {showHitsTotal && totalHits > 0 && (
              <div className={styles.searchHitsLabel}>
                {t(`searchHits`)}: <span>{totalHits}</span>
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
