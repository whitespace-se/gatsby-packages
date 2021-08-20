import { flattenDeep, isEmpty, negate } from "lodash-es";
import React, { useMemo } from "react";

import { useSearchParams } from "../../hooks";
import useAsync from "../../hooks/useAsync";
import isEmptySearch from "../../utils/isEmptySearch";
import context from "../context";

import useMiniSearch from "./useMiniSearch";
import useSearchDocuments from "./useSearchDocuments";

function extractKeys(objects) {
  return Object.keys(Object.assign({}, ...objects));
}

const isNotEmpty = negate(isEmpty);

const features = ["facetCounts", "facets", "pagination", "query"];

function normalizeDocuments(documents) {
  return flattenDeep(documents)
    .filter(isNotEmpty)
    .map((document) => ({
      ...document,
      text:
        (Array.isArray(document.text)
          ? flattenDeep(document.text).filter(isNotEmpty).join("\n")
          : document.text) || "",
    }));
}

export default function MinisearchSearchBackendProvider({
  settings: { miniSearch = {}, attributesForFaceting = [] } = {},
  children,
}) {
  const { Provider } = context;
  let documents = normalizeDocuments(useSearchDocuments());

  let {
    params: { sort = "score:desc", page, hitsPerPage = 20, ...otherParams },
  } = useSearchParams();

  let [sortBy, sortOrder = "asc"] = sort.split(":");

  let request = {
    ...otherParams,
    sortBy,
    sortOrder,
    from: ((page || 1) - 1) * hitsPerPage,
    size: hitsPerPage,
  };

  const storeFields = extractKeys(documents);

  const { search } = useMiniSearch({
    documents,
    fields: ["label", "text"],
    storeFields,
    // extractField: (document, fieldName) => get(document, fieldName),
    attributesForFaceting,
    ...miniSearch,
  });

  const { result, error, isPending } = useAsync(
    () => (isEmptySearch(request) ? Promise.resolve({}) : search(request)),
    [JSON.stringify(request)],
  );

  const value = useMemo(
    () => ({
      ...result,
      isPending,
      error,
      isError: !!error,
      page,
      hitsPerPage,
      totalPages: result && Math.ceil(result.totalHits / hitsPerPage),
      features,
    }),
    [JSON.stringify(result), page, hitsPerPage, isPending, error],
  );

  return (
    <Provider value={value}>
      {typeof children === "function" ? children(value) : children}
    </Provider>
  );
}
