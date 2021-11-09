import { sortBy } from "lodash-es";

export default function fromFacetsToOptions(
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
