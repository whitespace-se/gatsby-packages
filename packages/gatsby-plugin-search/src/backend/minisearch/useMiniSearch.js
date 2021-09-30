import { sortBy, uniq } from "lodash-es";
import MiniSearch from "minisearch";
import { useRef } from "react";

const getAttribute = (attribute) => (document) => document[attribute];

function isEmpty(value) {
  if (Array.isArray(value)) {
    return value.every((value) => value == null || value === "");
  }
  return value == null || value === "";
}

function filterHits({ miniSearch, documents, query, filterParams }) {
  const filter = (hit) =>
    Object.entries(filterParams)
      .filter(([, filterValue]) => !isEmpty(filterValue))
      .every(([key, filterValue]) => {
        if (Array.isArray(hit[key])) {
          if (Array.isArray(filterValue)) {
            return hit[key].some((value) => filterValue.includes(value));
          }
          return hit[key].includes(filterValue);
        }
        if (Array.isArray(filterValue)) {
          return filterValue.includes(hit[key]);
        }
        return hit[key] === filterValue;
      });

  // Skip minisearch altogether if there’s no query
  let hits = query
    ? miniSearch.search(query, { filter })
    : documents.filter(filter);

  return hits;
}

export default function useMiniSearch({
  documents,
  attributesForFaceting = [],
  ...options
}) {
  const miniSearchRef = useRef();

  if (!miniSearchRef.current) {
    miniSearchRef.current = new MiniSearch(options);
    miniSearchRef.current.addAll(documents);
  }

  const facetValues = {};
  attributesForFaceting.forEach((attribute) => {
    facetValues[attribute] = uniq(documents.map(getAttribute(attribute)));
  });

  const search = async (request) => {
    const {
      query,
      sortBy: sortField,
      sortOrder,
      from = 0,
      size = 20,
      ...filterParams
    } = request;

    let hits = filterHits({
      miniSearch: miniSearchRef.current,
      documents,
      query,
      filterParams,
    });

    const facets = {};
    attributesForFaceting.forEach((attribute) => {
      facets[attribute] = {};
      facetValues[attribute].forEach((value) => {
        // Make a search for each facet value as if it was set to calculate the number of hits
        facets[attribute][value] = filterHits({
          miniSearch: miniSearchRef.current,
          documents,
          query,
          filterParams: { ...filterParams, [attribute]: value },
        }).length;
      });
    });

    // Sorting
    if (sortField) {
      hits = sortBy(hits, sortField);
    }
    if (sortOrder === "desc") {
      hits.reverse();
    }

    let totalHits = hits.length;

    // Pagination
    hits = hits.slice(from, from + size);

    return {
      hits,
      facets,
      totalHits,
    };
  };

  return { search };
}
