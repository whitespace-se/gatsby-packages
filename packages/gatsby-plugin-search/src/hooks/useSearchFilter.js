import useSearch from "./useSearch";

function getFilterOptions({ aggregations, filter }) {
  return aggregations?.[filter] || {};
}

export default function useSearchFilter(filter) {
  const { filters, filterValues, setFilterValues, aggregations } = useSearch();
  const filterValue = filterValues[filter];
  const filterConfig = filters[filter];
  const options =
    filterConfig.options ||
    (filterConfig.getOptions || getFilterOptions)({
      aggregations,
      filter,
      ...filterConfig,
    });
  return {
    ...filterConfig,
    options,
    filterValue,
    setFilterValue: (newValue) => {
      if (typeof newValue === "function") {
        newValue = newValue(filterValue);
      }
      setFilterValues((values) => ({
        ...values,
        [filter]: newValue,
      }));
    },
  };
}
