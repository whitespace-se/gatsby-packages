import useSearchBackend from "./useSearchBackend";
import useSearchParams from "./useSearchParams";

export default function useSearch() {
  let searchParamsContextValue = useSearchParams();
  let searchBackendContextValue = useSearchBackend();
  return {
    features: [],
    ...searchParamsContextValue,
    ...searchBackendContextValue,
  };
}
