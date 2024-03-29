/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { searchPluginConfigContext } from "@whitespace/gatsby-plugin-search/src/contexts";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Configure } from "react-instantsearch-hooks-web";

// import SearchDebug from "./SearchDebug";
import SearchBox from "./SearchBox";
import SearchHit from "./SearchHit";
import SearchHits from "./SearchHits";
import SearchPagination from "./SearchPagination";
import SearchProvider from "./SearchProvider";
import SearchRangeInput from "./SearchRangeInput";

ContentTypeArchive.propTypes = {
  contentType: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

export default function ContentTypeArchive({ contentType }) {
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

  const { i18n } = useTranslation();
  const searchPluginConfig = useContext(searchPluginConfigContext);
  const archiveConfig = useMemo(() => {
    let archiveConfig = searchPluginConfig?.archives?.[contentType.name] || {};
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
        >
          <Configure filters={`language:${i18n.language}`} />
          <Configure filters={`contentType.name:${contentType.name}`} />
          {archiveConfig.sortBy !== "relevance" && (
            <Configure sortBy={`${indexName}_${archiveConfig.sortBy}`} />
          )}
          {!!archiveConfig.searchBox && <SearchBox searchAsYouType={false} />}
          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
              gap: 1rem;
            `}
          >
            {!!archiveConfig.facets.dates && (
              <SearchRangeInput
                css={css`
                  grid-column: span 2;
                `}
                attribute="dates.numeric"
              />
            )}
          </div>
          {/* <SearchDebug /> */}
          <SearchHits hitComponent={SearchHit} />
          <SearchPagination />
        </div>
      )}
    </SearchProvider>
  );
}
