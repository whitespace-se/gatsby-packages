import formatDate from "date-fns/format";
import parseDate from "date-fns/parse";
import { transform } from "lodash";
import { sortBy } from "lodash-es";
import { useTranslation } from "react-i18next";

function fromFacetsToOptions(
  counts,
  {
    showCounts,
    sortBy: sortByIteratee = ({ count }) => -count,
    label = (value) => value,
    anyLabel = () => "Any",
  } = {},
) {
  return [
    {
      value: "",
      label: showCounts
        ? `${anyLabel()} (${Object.values(counts).reduce(
            (sum, count) => sum + count,
            0,
          )})`
        : anyLabel(),
    },
    ...sortBy(
      Object.entries(counts).map(([value, count]) => ({
        value,
        label: showCounts ? `${label(value)} (${count})` : label(value),
        count,
      })),
      sortByIteratee,
    ),
  ];
}

function capitalizeFirstLetter([first, ...rest], locale) {
  return [first.toLocaleUpperCase(locale), ...rest].join("");
}

function formatMonth(date, locale) {
  return capitalizeFirstLetter(
    date.toLocaleDateString(locale, {
      month: "long",
    }),
    locale,
  );
}

export default function useSiteSearchParamTypes() {
  const { t, i18n } = useTranslation();
  return {
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
    },
    tags: {
      type: "string",
      multi: true,
      control: "select",
      options: ({ facets }) =>
        facets?.tags &&
        fromFacetsToOptions(facets?.tags, {
          showCounts: false,
        }),
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
              parseDate(value, "yyyy", new Date()).toLocaleDateString(
                i18n.language,
                {
                  year: "numeric",
                },
              ),
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
    },
    sort: {
      type: "string",
      multi: false,
      control: "links",
      options: () => ({
        "": t("relevance"),
        "publishDate:desc": t(`publishDate`),
      }),
    },
  };
}
