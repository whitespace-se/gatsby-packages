import React, { Suspense } from "react";

import { useSearchParams } from "../../hooks";
import isEmptySearch from "../../utils/isEmptySearch";
import FallbackSearchBackendProvider from "../fallback/FallbackSearchBackendProvider";

const MinisearchBackendProvider = React.lazy(() =>
  import("./MinisearchSearchBackendProvider"),
);

export default function LazyMinisearchSearchBackendProvider({
  preload,
  ...props
}) {
  const { params } = useSearchParams();
  if (!preload && isEmptySearch(params)) {
    return <FallbackSearchBackendProvider {...props} />;
  }
  return (
    <Suspense fallback={<FallbackSearchBackendProvider {...props} />}>
      <MinisearchBackendProvider {...props} />
    </Suspense>
  );
}
