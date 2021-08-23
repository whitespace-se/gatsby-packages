import { useID } from "@whitespace/components";
import { visuallyHidden } from "@whitespace/components/dist/utils/styles.module.css";
import clsx from "clsx";
import formatDate from "date-fns/format";
import parseDate from "date-fns/parse";
import { Formik, Form } from "formik";
import { mapValues } from "lodash";
import { sortBy } from "lodash-es";
import PropTypes from "prop-types";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import useFilterValues from "../backend/minisearch/useFilterValues";
import { useSearch, useSearchSettings } from "../hooks";

import * as styles from "./SearchForm.module.css";
import SearchFormQueryField from "./SearchFormQueryField";
import SelectField from "./SelectField";
import ToggleButtonGroup from "./ToggleButtonGroup";

SearchForm.propTypes = {
  className: PropTypes.string,
  showHitsTotal: PropTypes.bool,
};

function useFacetOptions(
  counts,
  { showCounts, label = (value) => value, anyLabel = () => "Any" },
) {
  return useMemo(
    () =>
      counts
        ? {
            "": showCounts
              ? `${anyLabel()} (${Object.values(counts).reduce(
                  (sum, count) => sum + count,
                  0,
                )})`
              : anyLabel(),
            ...mapValues(counts, (count, value) =>
              showCounts ? `${label(value)} (${count})` : label(value),
            ),
          }
        : null,
    [JSON.stringify(counts)],
  );
}

export default function SearchForm({
  className,
  showHitsTotal = true,
  ...props
}) {
  const {
    params,
    forcedParams,
    urlParams,
    setParams,
    schema,
    facets,
    features,
    hits,
  } = useSearch();
  const { t } = useTranslation();
  const { searchPlaceholderText, searchLabelText, searchButtonText } =
    useSearchSettings();

  const generateID = useID();

  const contentTypeOptions = useFacetOptions(facets && facets.contentType, {
    showCounts: features.includes("facetCounts"),
    label: (value) => t(`search.facetLabels.contentType.${value}`),
    anyLabel: () => t(`search.facetLabels.contentType.any`),
  });

  const tags = useFilterValues("tags");

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
      {({ setFieldValue, setValues, submitForm, values }) => (
        <Form className={clsx(styles.form, className)}>
          {"query" in values && (
            <SearchFormQueryField
              name="query"
              value={values.query}
              label={searchLabelText}
              placeholder={searchPlaceholderText}
              submitLabel={searchButtonText}
            />
          )}

          {"contentType" in values &&
            !(forcedParams && "contentType" in forcedParams) &&
            !!contentTypeOptions && (
              <>
                <div
                  id={generateID("content-type-label")}
                  className={visuallyHidden}
                >
                  {t(`sortOn`)}
                </div>
                <ToggleButtonGroup
                  aria-labelledby={generateID("content-type-label")}
                  options={contentTypeOptions}
                  name="contentType"
                  onMouseUp={() => {
                    setTimeout(submitForm, 0);
                  }}
                />
              </>
            )}

          <div className={styles.filterContainer}>
            {"tags" in values && (
              <SelectField
                className={styles.filterMulti}
                name="tags"
                isMulti={true}
                placeholder={t("tagsLabel")}
                value={values.tags}
                onChange={(value) => {
                  setFieldValue("tags", value);
                  setTimeout(submitForm, 0);
                }}
                options={tags}
              />
            )}

            {"year" in values && !!(facets && facets.year) && (
              <SelectField
                name="year"
                isMulti={false}
                placeholder={t("yearLabel")}
                isSearchable={false}
                value={values.year}
                onChange={(value) => {
                  setFieldValue("year", value);
                  setFieldValue("month", value ? "" : undefined);
                  setTimeout(submitForm, 0);
                }}
                options={[
                  { value: "", label: t(`search.facetLabels.year.any`) },
                  ...Object.entries(facets.year)
                    .filter(([, count]) => count > 0)
                    .map(([value]) => ({
                      label: value,
                      value,
                    })),
                ]}
              />
            )}

            {"month" in values && !!(facets && facets.month) && (
              <SelectField
                name="month"
                isMulti={false}
                placeholder={t("monthLabel")}
                isSearchable={false}
                value={values.month}
                onChange={(value) => {
                  setFieldValue("month", value);
                  setTimeout(submitForm, 0);
                }}
                options={[
                  { value: "", label: t(`search.facetLabels.month.any`) },
                  ...sortBy(
                    Object.entries(facets.month)
                      .filter(
                        ([value, count]) =>
                          count > 0 && value.startsWith(values.year),
                      )
                      .map(([value]) => ({
                        label: formatDate(
                          parseDate(value, "yyyy-MM", new Date()),
                          "MMMM",
                        ),
                        value: value,
                      })),
                    "value",
                  ),
                ]}
              />
            )}
            {Object.values(urlParams).length > 0 && (
              <button
                className={styles.clearFilter}
                onClick={() => {
                  setValues({});
                  setTimeout(submitForm, 0);
                }}
              >
                {t("clearFilterLabel")}
              </button>
            )}
          </div>
          <div className={styles.sortContainer}>
            {"sort" in values && (
              <div className={styles.toggleButtonGroupWrapper}>
                <div
                  id={generateID("sort-label")}
                  className={styles.toggleButtonGroupLabel}
                >
                  {t(`sortOn`)}
                </div>
                <ToggleButtonGroup
                  aria-labelledby={generateID("sort-label")}
                  options={{
                    "": t("relevance"),
                    "publishDate:desc": t(`publishDate`),
                  }}
                  name="sort"
                  itemAppearance="link"
                  onMouseUp={() => {
                    setTimeout(submitForm, 0);
                  }}
                />
              </div>
            )}
            {showHitsTotal && hits?.length > 0 && (
              <div className={styles.searchHitsLabel}>
                {t(`searchHits`)}: <span>{hits.length}</span>
              </div>
            )}
          </div>
        </Form>
      )}
    </Formik>
  );
}
