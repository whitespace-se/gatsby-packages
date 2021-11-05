export { default as capitalizeFirstLetter } from "./capitalizeFirstLetter";
export { default as formatMonth } from "./formatMonth";
import { sortBy } from "lodash-es";

export function fromFacetsToOptions(
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

export function getOptionsFromTaxonomy(taxonomyGraphqlSingleName) {
  return ({
    // facets,
    taxonomies,
  }) => {
    let terms =
      taxonomies.find(
        (taxonomy) => taxonomy.graphqlSingleName === taxonomyGraphqlSingleName,
      )?.terms || [];
    return terms.map(({ slug, name }) => ({
      // label: `${name} (${facets?.terms?.[slug] || 0})`,
      // count: facets?.terms?.[slug] || 0,
      label: name,
      value: slug,
    }));
  };
}
