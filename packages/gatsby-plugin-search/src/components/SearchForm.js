import { useID } from "@whitespace/components";
import { visuallyHidden } from "@whitespace/components/dist/utils/styles.module.css";
import { Formik, Form } from "formik";
import { mapValues } from "lodash";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { useSearch, useSearchSettings } from "../hooks";

import * as styles from "./SearchForm.module.css";
import SearchFormQueryField from "./SearchFormQueryField";
// import SelectField from "./SelectField";
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

export default function SearchForm(props) {
  const { params, forcedParams, setParams, schema, facets, features } =
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
      {({
        // setFieldValue,
        submitForm,
        values,
      }) => (
        <Form className={styles.form}>
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

          {/* {"tags" in values && (
            <SelectField
              name="tags"
              isMulti={true}
              value={values.tags}
              onChange={(value) => {
                setFieldValue("tags", value);
                setTimeout(submitForm, 0);
              }}
              options={{
                foo: "Foo",
                bar: "Bar",
                baz: "Baz",
              }}
            />
          )} */}

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
        </Form>
      )}
    </Formik>
  );
}
