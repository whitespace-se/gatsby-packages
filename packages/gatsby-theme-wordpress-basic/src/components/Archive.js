import { H, Section } from "@jfrk/react-heading-levels";
import { withComponentDefaults } from "@whitespace/components";
import {
  SearchForm,
  SearchResults,
  URLSearchParamsProvider,
  SearchPagination,
} from "@whitespace/gatsby-plugin-search";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import {
  getMainArchivePageTitleFromPageContext,
  // getMainArchivePageLabelFromPageContext,
  // getMainArchivePagePathFromPageContext,
  getArchiveURLPatternFromPageContext,
} from "../contentType";
import { useArchiveParamTypes, usePageContext } from "../hooks";

import * as defaultStyles from "./Archive.module.css";
import DefaultSearchBackendProvider from "./DefaultSearchBackendProvider";

Archive.propTypes = {
  className: PropTypes.string,
  components: PropTypes.objectOf(PropTypes.elementType),
  styles: PropTypes.objectOf(PropTypes.string),
  transformParams: PropTypes.func,
};

export default withComponentDefaults(Archive, "archive");

function Archive({
  className,
  styles = defaultStyles,
  transformParams = (params) => params,
  components: { SearchBackendProvider = DefaultSearchBackendProvider } = {
    SearchBackendProvider: DefaultSearchBackendProvider,
  },
  ...restProps
}) {
  const paramTypes = useArchiveParamTypes();
  const pageContext = usePageContext();

  const forcedParams = {
    contentType: pageContext.contentType.name,
    sort: "publishDate:desc",
  };

  return (
    <article className={clsx(styles.component, className)} {...restProps}>
      <div className="o-grid">
        <div className="o-grid-row">
          <div className="o-grid-block o-grid-block--inherit">
            <H className="c-article__title">
              {getMainArchivePageTitleFromPageContext(pageContext)}
            </H>
            <Section>
              <URLSearchParamsProvider
                urlPattern={getArchiveURLPatternFromPageContext(pageContext)}
                forcedParams={forcedParams}
                paramTypes={paramTypes}
                decodeParams={({ year, month, ...params }) => ({
                  ...params,
                  date: month ? `${year}-${month}` : year,
                })}
                encodeParams={({ date, ...params }) => ({
                  ...params,
                  ...(/^\d{4}$/.test(date) && { year: date }),
                  ...(/^\d{4}-\d{2}$/.test(date) && {
                    year: date.substring(0, 4),
                    month: date.substring(5, 7),
                  }),
                })}
              >
                <SearchBackendProvider transformParams={transformParams}>
                  <SearchForm />
                  <SearchResults />
                  <SearchPagination />
                </SearchBackendProvider>
              </URLSearchParamsProvider>
            </Section>
          </div>
        </div>
      </div>
    </article>
  );
}
