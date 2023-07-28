/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import { searchPluginConfigContext } from "@whitespace/gatsby-plugin-search/src/contexts";
import {
  SearchBox,
  Hits,
  Pagination as DefaultPagination,
  MenuButtonGroup,
} from "@wsui/algolia";
import { H, Section, useThemeProps, handleComponentsProp } from "@wsui/base";
import { camelCase } from "lodash/fp.js";
import { useContext, useMemo } from "react";
// import { Fragment } from "react";
// import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Configure } from "react-instantsearch-hooks";

// import SearchDebug from "./SearchDebug";
// import SearchHit from "./SearchHit";
// import SearchHits from "./SearchHits";
// import SearchMenuButtonGroup from "./SearchMenuButtonGroup";
// import SearchPagination from "./SearchPagination";
import SearchProvider from "./SearchProvider.jsx";
// import SearchRangeInput from "./SearchRangeInput";
// import SearchSortBy from "./SearchSortBy";
// import SearchSummary from "./SearchSummary";

export default function SiteSearch(props) {
  props = useThemeProps({ props, name: "SiteSearch" });
  let { components, ...restProps } = props;
  let { Pagination } = handleComponentsProp(components, {
    Pagination: DefaultPagination,
  });
  const theme = useTheme();
  // const {
  //   indexUiState,
  //   setIndexUiState,
  //   uiState,
  //   setUiState,
  //   results,
  //   scopedResults,
  //   refresh,
  //   use,
  // } = useInstantSearch();

  const { t, i18n } = useTranslation();
  const searchPluginConfig = useContext(searchPluginConfigContext);
  const facets = useMemo(() => {
    return {
      ...searchPluginConfig?.facets,
      contentType:
        searchPluginConfig?.facets?.contentType === false
          ? undefined
          : {
              attribute: "contentType.name",
              ...searchPluginConfig?.facets?.contentType,
              options: (
                searchPluginConfig?.facets?.contentType?.options || [
                  "page",
                  "post",
                ]
              ).reduce(
                (obj, value) => (
                  (obj[value] = t(
                    `search.facetLabels.contentType.${camelCase(value)}`,
                  )),
                  obj
                ),
                {
                  "": {
                    label: t("search.facetLabels.contentType.any"),
                    count: (item, items) =>
                      items.reduce(
                        (acc, item) => acc + Number(item.count) || 0,
                        0,
                      ),
                  },
                },
              ),
            },
    };
  }, []);

  return (
    <SearchProvider routing={true}>
      {({ indexName }) => (
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
          `}
          {...restProps}
        >
          <Configure filters={`language:${i18n.language}`} />
          <SearchBox searchAsYouType={false} />
          {!!facets.contentType && (
            <MenuButtonGroup
              label={t("search.facets.contentType.label")}
              hideLabel
              {...facets.contentType}
              // Optional parameters
              // limit={number}
              // showMore={boolean}
              // showMoreLimit={number}
              // sortBy={string[] | function}
            />
          )}
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr max-content;
              align-items: end;
            `}
          >
            {/* <SearchSortBy
              label={t("sortBy")}
              items={[
                { label: t("search.sortBy.relevance"), value: indexName },
                {
                  label: t("search.sortBy.publishDate"),
                  value: `${indexName}_publish_date`,
                },
              ]}
            /> */}
            {/* <SearchSummary /> */}
          </div>
          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
              gap: 1rem;
            `}
          >
            {/* <SearchRangeInput
              css={css`
                grid-column: span 2;
              `}
              attribute="dates.numeric"
            /> */}
          </div>
          {/* <SearchDebug /> */}
          <div id="search-results">
            <H
              css={css`
                ${theme.styleUtils.visuallyHidden}
              `}
            >
              {t("wsui.algolia.searchResultsHeading")}
            </H>
            <Section>
              <Hits />
            </Section>
          </div>
          <Pagination />
        </div>
      )}
    </SearchProvider>
  );
}
