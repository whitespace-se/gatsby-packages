/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import { searchPluginConfigContext } from "@whitespace/gatsby-plugin-search/src/contexts";
import {
  SearchBox,
  Hits,
  Pagination as DefaultPagination,
} from "@wsui/algolia";
import { H, Section, handleComponentsProp, useThemeProps } from "@wsui/base";
import startOfToday from "date-fns/startOfToday";
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

export default function ContentTypeArchive(props) {
  props = useThemeProps({ props, name: "ContentTypeArchive" });
  let { contentType, components, ...restProps } = props;
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
  const archiveConfig = useMemo(() => {
    let archiveConfig =
      searchPluginConfig?.archives?.[contentType.graphqlSingleName] || {};
    return {
      searchBox: false,
      sortBy: archiveConfig.searchBox ? "relevance" : "publish_date",
      ...archiveConfig,
      facets: {
        dates: true,
        ...archiveConfig?.facets,
      },
    };
  }, []);

  return (
    <SearchProvider routing={true} skipSearchIf={() => false}>
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
          <Configure
            filters={`contentType.name:${contentType.graphqlSingleName}`}
          />
          {archiveConfig.sortBy !== "relevance" && (
            <Configure sortBy={`${indexName}_${archiveConfig.sortBy}`} />
          )}
          {(archiveConfig.filters || []).map((filter, index) => (
            <Configure
              key={index}
              filters={filter.replace(
                "{{today_numeric}}",
                startOfToday().valueOf(),
              )}
            />
          ))}
          {!!archiveConfig.searchBox && <SearchBox searchAsYouType={false} />}
          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
              gap: 1rem;
            `}
          >
            {/* {!!archiveConfig.facets.dates && (
              <SearchRangeInput
                css={css`
                  grid-column: span 2;
                `}
                attribute="dates.numeric"
              />
            )} */}
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
              <Hits
                searchPageType="archive"
                contentType={contentType.graphqlSingleName}
              />
            </Section>
          </div>
          <Pagination />
        </div>
      )}
    </SearchProvider>
  );
}
