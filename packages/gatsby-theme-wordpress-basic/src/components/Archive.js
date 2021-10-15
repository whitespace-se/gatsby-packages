import { H, Section } from "@jfrk/react-heading-levels";
import {
  LazyMinisearchSearchBackendProvider,
  SearchContextDebug,
  SearchForm,
  SearchResults,
  URLSearchParamsProvider,
  SearchPagination,
} from "@whitespace/gatsby-plugin-search";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import * as yup from "yup";

import {
  getMainArchivePageTitleFromPageContext,
  // getMainArchivePageLabelFromPageContext,
  // getMainArchivePagePathFromPageContext,
  getArchiveURLPatternFromPageContext,
} from "../contentType";
import { layout } from "../foundation";
import { usePageContext } from "../hooks";

import * as defaultStyles from "./Archive.module.css";

Archive.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
};

export default function Archive({
  styles = defaultStyles,
  className,
  ...restProps
}) {
  let pageContext = usePageContext();
  return (
    <article
      className={clsx(layout.component, layout.componentWidthFull, className)}
      {...restProps}
    >
      <div className="o-grid">
        <div className="o-grid-row">
          <div className="o-grid-block o-grid-block--inherit">
            <H className="c-article__title">
              {getMainArchivePageTitleFromPageContext(pageContext)}
            </H>
            <Section>
              <URLSearchParamsProvider
                urlPattern={getArchiveURLPatternFromPageContext(pageContext)}
                forcedParams={{ contentType: "post", sort: "publishDate:desc" }}
                encodeParam={(value, param) => {
                  switch (param) {
                    case "month":
                      return value.substring(5, 7);
                    default:
                      return value;
                  }
                }}
                decodeParam={(value, param, params) => {
                  switch (param) {
                    case "month":
                      return `${params.year}-${value}`;
                    default:
                      return value;
                  }
                }}
                schema={yup.object({
                  // tags: yup.array().default([]),
                  year: yup.string().ensure(),
                  month: yup
                    .string()
                    .ensure()
                    .when("year", (year, schema) =>
                      year ? schema : schema.strip(),
                    ),
                })}
              >
                <LazyMinisearchSearchBackendProvider
                  preload={true}
                  settings={{
                    attributesForFaceting: ["year", "month"],
                  }}
                >
                  <SearchForm showHitsTotal={false} />
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
            </Section>
          </div>
        </div>
      </div>
    </article>
  );
}
