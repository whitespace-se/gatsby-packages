import { H } from "@jfrk/react-heading-levels";
import {
  URLSearchParamsProvider,
  LazyMinisearchSearchBackendProvider,
  SearchContextDebug,
  SearchResults,
  SearchForm,
  SearchPagination,
} from "@whitespace/gatsby-plugin-search";
import clsx from "clsx";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { useSiteSearchParamTypes } from "../hooks";

import * as searchStyles from "./SiteSearch.module.css";

export default SiteSearch;

function SiteSearch() {
  const { t } = useTranslation();
  const paramTypes = useSiteSearchParamTypes();
  return (
    <>
      <H className="c-article__title c-archive__title">
        {t("siteSearchTitle")}
      </H>
      <div className={clsx(searchStyles.component)}>
        <div className={clsx(searchStyles.wrapper)}>
          <URLSearchParamsProvider
            paramTypes={paramTypes}
            decodeParams={({ year, month, ...params }) => ({
              ...params,
              date: month || year,
            })}
            encodeParams={({ date, ...params }) => ({
              ...params,
              ...(/^\d{4}$/.test(date) && { year: date }),
              ...(/^\d{4}-\d{2}$/.test(date) && { month: date }),
            })}
          >
            <LazyMinisearchSearchBackendProvider
              preload={true}
              settings={{
                attributesForFaceting: ["contentType", "tags", "month"],
              }}
              transformParams={({ date, ...params }) => ({
                ...params,
                ...(/^\d{4}$/.test(date) && {
                  month: [
                    "01",
                    "02",
                    "03",
                    "04",
                    "05",
                    "06",
                    "07",
                    "08",
                    "09",
                    "10",
                    "11",
                    "12",
                  ].map((m) => `${date}-${m}`),
                }),
                ...(/^\d{4}-\d{2}$/.test(date) && { month: [date] }),
              })}
            >
              <SearchForm className={searchStyles.form} />
              {process.env.NODE_ENV !== "production" && (
                <details>
                  <summary>Debug</summary>
                  <SearchContextDebug />
                </details>
              )}
              <SearchResults />
              <SearchPagination />
            </LazyMinisearchSearchBackendProvider>
          </URLSearchParamsProvider>
        </div>
      </div>
    </>
  );
}
