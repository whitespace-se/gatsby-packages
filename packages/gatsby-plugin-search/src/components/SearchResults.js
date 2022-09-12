import React from "react";
import { useTranslation } from "react-i18next";

import useSearch from "../hooks/useSearch";

import SearchHits from "./SearchHits";

export default function SearchResults({ ...restProps }) {
  const { t } = useTranslation();
  const { hits, isReady, isPending, error, isEmptySearch } = useSearch();
  return (
    <div {...restProps}>
      {isEmptySearch ? (
        <div>{t("Enter search query…")}</div>
      ) : isPending || !isReady ? (
        <div>{t("Fetching search results…")}</div>
      ) : error ? (
        <div>{t("An error occurred while fetching search results")}</div>
      ) : !hits || hits.length === 0 ? (
        <div>{t("Found no search results")}</div>
      ) : (
        <SearchHits hits={hits} />
      )}
    </div>
  );
}
