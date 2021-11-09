import formatDate from "date-fns/format";
import parseDate from "date-fns/parse";
import { transform } from "lodash";
import { useTranslation } from "react-i18next";

import {
  formatMonth,
  fromFacetsToOptions,
  getOptionsFromTaxonomy,
} from "../utils";

export default function useSiteSearchParamTypes() {
  const { t, i18n } = useTranslation();
  return {
    query: { type: "string", control: "query" },
    contentType: {
      type: "string",
      multi: false,
      control: "buttonGroup",
      options: ({ facets, features }) =>
        facets?.contentType &&
        fromFacetsToOptions(facets?.contentType, {
          showCounts: features.includes("facetCounts"),
          sortBy: "value",
          label: (value) => t(`search.facetLabels.contentType.${value}`),
          anyLabel: () => t(`search.facetLabels.contentType.any`),
        }),
      conditions: { query: Boolean },
    },
    tags: {
      type: "string",
      multi: true,
      control: "select",
      label: t("tagsLabel"),
      options: getOptionsFromTaxonomy("tag"),
      conditions: { contentType: (value) => value === "post" },
    },
    date: {
      type: "date",
      control: "month-select",
      yearOptions: ({ facets }) =>
        facets?.month &&
        fromFacetsToOptions(
          transform(
            facets.month,
            (years, monthCount, month) => {
              let year = month.substr(0, 4);
              years[year] = (years[year] || 0) + monthCount;
            },
            {},
          ),
          {
            showCounts: false,
            sortBy: "value",
            label: (value) =>
              formatDate(parseDate(value, "yyyy", new Date()), "yyyy"),
            anyLabel: () => t(`search.facetLabels.year.any`),
          },
        ),
      monthOptions: ({ facets }) =>
        facets?.month &&
        fromFacetsToOptions(facets.month, {
          showCounts: false,
          sortBy: "value",
          label: (value) =>
            formatMonth(parseDate(value, "yyyy-MM", new Date()), i18n.language),
          anyLabel: () => t(`search.facetLabels.month.any`),
        }),
      conditions: { contentType: (value) => value === "post" },
    },
    sort: {
      type: "string",
      multi: false,
      control: "links",
      options: () => ({
        "": t("relevance"),
        "publishDate:desc": t(`publishDate`),
      }),
      conditions: { query: Boolean },
    },
  };
}
