// import { useStaticQuery, graphql } from "gatsby";

import { useTranslation } from "react-i18next";

export default function useSearchSettings() {
  const { t } = useTranslation();
  return {
    emptySearchResultMessage: "No results",
    searchPlaceholderText: t(`searchPlaceholderText`),
    searchLabelText: t(`searchLabelText`),
    searchButtonText: t(`searchButtonText`),
  };
}
