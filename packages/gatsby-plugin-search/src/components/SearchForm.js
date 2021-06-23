import { useID } from "@whitespace/components";
import { visuallyHidden } from "@whitespace/components/dist/utils/styles.module.css";
import clsx from "clsx";
import { Formik, Form } from "formik";
import { mapValues } from "lodash";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import useFilterValues from "../backend/minisearch/useFilterValues";
import { useSearch, useSearchSettings, useDateValues } from "../hooks";

import * as styles from "./SearchForm.module.css";
import SearchFormQueryField from "./SearchFormQueryField";
import SelectField from "./SelectField";
import ToggleButtonGroup from "./ToggleButtonGroup";

function useFacetOptions(facets, showCounts) {
  const { t } = useTranslation();
  return useMemo(
    () =>
      mapValues(facets || {}, (counts, facet) => ({
        "": showCounts
          ? `${t(`search.facetLabels.${facet}.any`)} (${Object.values(
              counts,
            ).reduce((sum, count) => sum + count, 0)})`
          : t(`search.facetLabels.${facet}.any`),
        ...mapValues(counts, (count, value) =>
          showCounts
            ? `${t(`search.facetLabels.${facet}.${value}`)} (${count})`
            : t(`search.facetLabels.${facet}.${value}`),
        ),
      })),
    [JSON.stringify(facets)],
  );
}

export default function SearchForm({ className, ...props }) {
  const { params, forcedParams, setParams, schema, facets, features, hits } =
    useSearch();
  const { t } = useTranslation();
  const {
    emptySearchResultMessage,
    searchPlaceholderText,
    searchLabelText,
    searchButtonText,
  } = useSearchSettings();

  const generateID = useID();

  const facetOptions = useFacetOptions(
    facets,
    features.includes("facetCounts"),
  );

  const tags = useFilterValues("tags");
  const year = useDateValues(hits, "year");
  const month = useDateValues(hits, "month", params);

  return (
    <Formik
      initialValues={params}
      enableReinitialize={true}
      validationSchema={schema}
      onSubmit={async (values) => {
        setParams(values);
      }}
      {...props}
    >
      {({ setFieldValue, submitForm, values }) => (
        <Form className={clsx(styles.form, className)}>
          <SearchFormQueryField
            name="query"
            value={values.query}
            label={searchLabelText}
            placeholder={searchPlaceholderText}
            submitLabel={searchButtonText}
          />

          {"contentType" in values &&
            !(forcedParams && "contentType" in forcedParams) &&
            !!facetOptions?.contentType && (
              <>
                <div
                  id={generateID("content-type-label")}
                  className={visuallyHidden}
                >
                  {t(`sortOn`)}
                </div>
                <ToggleButtonGroup
                  aria-labelledby={generateID("content-type-label")}
                  options={facetOptions.contentType}
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

            {"year" in values && (
              <SelectField
                name="year"
                isMulti={false}
                placeholder={t("yearLabel")}
                isSearchable={false}
                value={values.year}
                onChange={(value) => {
                  setFieldValue("year", value);
                  setFieldValue("month", 0);
                  setTimeout(submitForm, 0);
                }}
                options={year}
              />
            )}

            {"month" in values &&
              values.year.length > 0 &&
              !values.year.includes("0") && (
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
                  options={month}
                />
              )}
            {(values.tags?.length > 0 ||
              values.year?.length > 0 ||
              values.month?.length > 0) && (
              <button
                className={styles.clearFilter}
                onClick={() => {
                  if (values.contentType == "post") {
                    setFieldValue("tags", []);
                    setFieldValue("year", []);
                    setFieldValue("month", []);
                    setTimeout(submitForm, 0);
                  }
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
            {hits?.length > 0 && (
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
