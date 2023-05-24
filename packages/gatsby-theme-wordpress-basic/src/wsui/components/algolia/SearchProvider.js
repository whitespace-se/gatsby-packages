/** @jsx jsx */
import {
  // css,
  jsx,
} from "@emotion/react";
import { algoliaContext } from "@whitespace/gatsby-plugin-search/src/contexts";
import {
  parseFormattedDateRange,
  parseNumericDateRange,
  stringifyFormattedDateRange,
  stringifyNumericDateRange,
} from "@whitespace/gatsby-plugin-search/src/utils";
import ClientOnly from "@whitespace/gatsby-theme-wordpress-basic/src/components/ClientOnly";
import PropTypes from "prop-types";
import { useContext, useMemo } from "react";
import { InstantSearch } from "react-instantsearch-hooks-web";

SearchProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  fallback: PropTypes.node,
  routing: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.shape({
      stateMapping: PropTypes.shape({
        stateToRoute: PropTypes.func,
        routeToState: PropTypes.func,
      }),
    }),
  ]),
  skipSearchIf: PropTypes.func,
  transformParams: PropTypes.func,
};

export default function SearchProvider({
  children,
  fallback = <div>Enable Javascript to use the search</div>,
  routing,
  skipSearchIf = (params) => !params.query && !params.facetFilters?.length,
  transformParams = (params) => params,
  // ...restProps
}) {
  const { searchClient: algoliaClient, indexName } = useContext(algoliaContext);

  const searchClient = useMemo(
    () => ({
      ...algoliaClient,
      async search(requests, ...args) {
        let interceptedRequests = [],
          forwardedRequests = [],
          results = [];
        requests.forEach((request, index) => {
          if (skipSearchIf(request.params)) {
            interceptedRequests.push({ index, request });
          } else {
            forwardedRequests.push({ index, request });
          }
        });
        interceptedRequests.forEach((entry) => {
          // entry.result = {
          //   hits: [],
          //   nbHits: 0,
          //   nbPages: 0,
          //   page: 0,
          //   processingTimeMS: 0,
          // }
          results[entry.index] = {
            hits: [],
            nbHits: 0,
            nbPages: 0,
            page: 0,
            processingTimeMS: 0,
            intercepted: true,
          };
        });
        forwardedRequests = forwardedRequests.map(({ request, ...rest }) => ({
          ...rest,
          request: { ...request, params: transformParams(request.params) },
        }));
        let algoliaResponse = await algoliaClient.search(
          forwardedRequests.map((entry) => entry.request),
          ...args,
        );
        algoliaResponse.results.forEach((result, index) => {
          // forwardedRequests[index].result = result;
          results[forwardedRequests[index].index] = result;
        });
        return {
          results,
        };
      },
    }),
    [algoliaClient],
  );

  if (routing === true) {
    routing = {
      stateMapping: {},
    };
  }

  let stateToRoute =
    routing.stateMapping.stateToRoute || ((uiState, routeState) => routeState);
  let routeToState =
    routing.stateMapping.routeToState || ((routeState, uiState) => uiState);

  routing = {
    stateMapping: {
      stateToRoute(uiState) {
        // console.log(uiState[indexName]);
        const helpers = {};
        const { query, menu, range, page, sortBy } = uiState[indexName];
        const routeState = {
          query,
          contentType: menu?.["contentType.name"],
          date: stringifyFormattedDateRange(
            parseNumericDateRange(range?.["dates.numeric"]),
          ),
          // brand:
          //   refinementList?.brand,
          sort: sortBy && sortBy.substring(indexName.length + 1),
          page,
        };
        // console.log("stateToRoute", routeState);
        return stateToRoute(uiState, routeState, helpers);
      },
      routeToState(routeState) {
        const helpers = {};
        const { query, contentType, date, page, sort } = routeState;
        const uiState = {
          [indexName]: {
            query,
            menu: {
              ["contentType.name"]: contentType,
            },
            range: {
              ["dates.numeric"]: stringifyNumericDateRange(
                parseFormattedDateRange(date),
              ),
            },
            // refinementList: {
            //   // brand,
            // },
            sortBy: sort && `${indexName}_${sort}`,
            page,
          },
        };
        // console.log("routeToState", uiState);
        return routeToState(routeState, uiState, helpers);
      },
    },
  };

  return (
    <ClientOnly fallback={fallback}>
      <InstantSearch
        indexName={indexName}
        routing={routing}
        searchClient={searchClient}
      >
        {typeof children === "function"
          ? children({ indexName, routing, searchClient })
          : children}
      </InstantSearch>
    </ClientOnly>
  );
}
