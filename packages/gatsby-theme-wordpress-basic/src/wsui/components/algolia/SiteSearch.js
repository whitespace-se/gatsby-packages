/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { searchPluginConfigContext } from "@whitespace/gatsby-plugin-search/src/contexts";
import { useContext, useMemo } from "react";
// import { Fragment } from "react";
// import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";
import { Configure } from "react-instantsearch-hooks-web";

import SearchBox from "./SearchBox";
import SearchDebug from "./SearchDebug";
import SearchHit from "./SearchHit";
import SearchHits from "./SearchHits";
import SearchMenuButtonGroup from "./SearchMenuButtonGroup";
import SearchPagination from "./SearchPagination";
import SearchProvider from "./SearchProvider";
import SearchRangeInput from "./SearchRangeInput";
import SearchSortBy from "./SearchSortBy";
import SearchSummary from "./SearchSummary";

SiteSearch.propTypes = {};

export default function SiteSearch() {
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
                  (obj[value] = t(`search.facetLabels.contentType.${value}`)),
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
    <SearchProvider
      routing={true}
      // transformParams={(params) => ({
      //   ...params,
      //   filters: [params.filters, `language:${i18n.language}`]
      //     .filter(Boolean)
      //     .join(" AND "),
      // })}
    >
      {({ indexName }) => (
        <div
          css={css`
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
          `}
        >
          <Configure filters={`language:${i18n.language}`} />
          <SearchBox searchAsYouType={false} />
          {!!facets.contentType && (
            <SearchMenuButtonGroup
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
            <SearchSortBy
              label={t("sortBy")}
              items={[
                { label: t("search.sortBy.relevance"), value: indexName },
                {
                  label: t("search.sortBy.publishDate"),
                  value: `${indexName}_publish_date`,
                },
              ]}
            />
            <SearchSummary />
          </div>
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
          <SearchPagination
          // Optional props
          // totalPages={number}
          // padding={number}
          // showFirst={boolean}
          // showPrevious={boolean}
          // showNext={boolean}
          // showLast={boolean}
          // classNames={object}
          // translations={object}
          />
        </div>
      )}
    </SearchProvider>
  );
}
