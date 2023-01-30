/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import PropTypes from "prop-types";
// import { Fragment } from "react";
import { useTranslation } from "react-i18next";
import { Configure } from "react-instantsearch-hooks-web";

// import SearchDebug from "./SearchDebug";
import SearchHit from "./SearchHit";
import SearchHits from "./SearchHits";
import SearchPagination from "./SearchPagination";
import SearchProvider from "./SearchProvider";
import SearchRangeInput from "./SearchRangeInput";

CotnentTypeArchive.propTypes = {
  contentType: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }),
};

export default function CotnentTypeArchive({ contentType }) {
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
  // const searchPluginConfig = useContext(searchPluginConfigContext);
  // const facets = useMemo(() => {
  //   return {
  //     ...searchPluginConfig?.facets,
  //   };
  // }, []);

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
          <Configure sortBy={`${indexName}_publish_date`} />
          <div
            css={css`
              display: grid;
              grid-template-columns: repeat(auto-fill, minmax(10rem, 1fr));
              gap: 1rem;
            `}
          >
            <SearchRangeInput
              css={css`
                grid-column: span 2;
              `}
              attribute="dates.numeric"
            />
          </div>
          {/* <SearchDebug /> */}
          <SearchHits hitComponent={SearchHit} />
          <SearchPagination />
        </div>
      )}
    </SearchProvider>
  );
}
