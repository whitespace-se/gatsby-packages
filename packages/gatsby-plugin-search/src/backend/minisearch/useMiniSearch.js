import { sortBy, reverse, uniq } from "lodash-es";
import MiniSearch from "minisearch";
import { useRef, useEffect } from "react";

const getAttribute = (attribute) => (document) => document[attribute];

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
      from,
      size,
      ...filterParams
    } = request;

    const filter = (hit) =>
      Object.entries(filterParams)
        .filter(
          ([, value]) =>
            value !== "" && !(Array.isArray(value) && value.length === 0),
        )
        .every(([key, value]) => value == null || hit[key] === value);

    const facets = {};
    attributesForFaceting.forEach((attribute) => {
      facets[attribute] = {};
      facetValues[attribute].forEach((value) => {
        facets[attribute][value] = null;
      });
      // documents.forEach((document) => {
      //   let value = getAttribute(attribute)(document);
      //   facets[attribute][value]++;
      // });
      // facets[attribute] = countBy(documents, getAttribute(attribute))
    });

    let hits = query
      ? miniSearchRef.current.search(query, { filter })
      : documents.filter(filter);

    if (sortField) {
      hits = sortBy(hits, sortField);
    }

    if (sortOrder === "desc") {
      hits.reverse();
    }

    return {
      hits,
      facets,
    };
  };

  return { search };
}
