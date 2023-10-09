/** @jsx jsx */
import {
  // css,
  jsx,
} from "@emotion/react";
import { algoliaContext } from "@whitespace/gatsby-plugin-search/src/contexts";
// import {
//   parseFormattedDateRange,
//   parseNumericDateRange,
//   stringifyFormattedDateRange,
//   stringifyNumericDateRange,
// } from "@whitespace/gatsby-plugin-search/src/utils";
import { ClientOnly } from "@wsui/base";
import { useContext, useMemo } from "react";
import { InstantSearch } from "react-instantsearch-hooks-web";

export default function SearchProvider({
  children,
  fallback = null,
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
        const helpers = {};
        const {
          query,
          // menu,
          // range,
          page,
          // sortBy,
        } = uiState[indexName];
        const routeState = {
          query,
          // contentType: menu?.["contentType.name"],
          // date: stringifyFormattedDateRange(
          //   parseNumericDateRange(range?.["dates.numeric"]),
          // ),
          // sort: sortBy && sortBy.substring(indexName.length + 1),
          page,
        };
        return stateToRoute(uiState, routeState, helpers);
      },
      routeToState(routeState) {
        const helpers = {};
        const {
          query,
          // contentType,
          // date,
          page,
          // sort,
        } = routeState;
        const uiState = {
          [indexName]: {
            query,
            // menu: {
            //   ["contentType.name"]: contentType,
            // },
            // range: {
            //   ["dates.numeric"]: stringifyNumericDateRange(
            //     parseFormattedDateRange(date),
            //   ),
            // },
            // sortBy: sort && `${indexName}_${sort}`,
            page,
          },
        };
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
