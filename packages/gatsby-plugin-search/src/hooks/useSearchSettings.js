// import { useStaticQuery, graphql } from "gatsby";

import { useTranslation } from "react-i18next";

export default function useSearchSettings() {
  const { t } = useTranslation();
  return {
    emptySearchResultMessage: "No results",
    searchPlaceholderText: "Search…",
    searchLabelText: t(`search`),
    searchButtonText: t(`search`),
  };
}
