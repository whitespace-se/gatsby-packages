import { H, Section } from "@jfrk/react-heading-levels";
import {
  PageGrid,
  PageGridItem,
  withComponentDefaults,
} from "@whitespace/components";
import {
  URLSearchParamsProvider,
  SearchResults,
  SearchForm,
  SearchPagination,
} from "@whitespace/gatsby-plugin-search";
import clsx from "clsx";
import PropTypes from "prop-types";
import * as React from "react";
import { useTranslation } from "react-i18next";

import { useSiteSearchParamTypes } from "../hooks";

import DefaultSearchBackendProvider from "./DefaultSearchBackendProvider";
import SEO from "./SEO";
import * as searchStyles from "./SiteSearch.module.css";

SiteSearch.propTypes = {
  components: PropTypes.objectOf(PropTypes.elementType),
  transformParams: PropTypes.func,
};

export default withComponentDefaults(SiteSearch, "siteSearch");

function SiteSearch({
  components: { SearchBackendProvider = DefaultSearchBackendProvider } = {
    SearchBackendProvider: DefaultSearchBackendProvider,
  },
  transformParams = (params) => params,
}) {
  const { t } = useTranslation();
  const paramTypes = useSiteSearchParamTypes();

  const title = t("siteSearchTitle");

  return (
    <>
      <SEO title={title} />
      <PageGrid>
        <PageGridItem>
          <H className="c-article__title">{title}</H>
          <Section>
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
                <SearchBackendProvider transformParams={transformParams}>
                  <SearchForm className={searchStyles.form} />
                  <SearchResults />
                  <SearchPagination />
                </SearchBackendProvider>
              </URLSearchParamsProvider>
            </div>
          </Section>
        </PageGridItem>
      </PageGrid>
    </>
  );
}
