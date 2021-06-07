import useAsync from "../../hooks/useAsync";

export default function useFetchJSON(url, options, deps) {
  return useAsync(
    () => window.fetch(url, options).then((res) => res.json()),
    deps,
  );
}
