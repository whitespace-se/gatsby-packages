import { sortBy, reverse } from "lodash-es";
import MiniSearch from "minisearch";
import { useRef, useEffect } from "react";

export default function useMiniSearch({ documents, ...options }) {
  const miniSearchRef = useRef();

  if (!miniSearchRef.current) {
    miniSearchRef.current = new MiniSearch(options);
    miniSearchRef.current.addAll(documents);
  }

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
    };
  };

  return { search };
}
