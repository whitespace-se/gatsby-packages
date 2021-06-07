import { isEqual } from "lodash-es";
import { useState } from "react";

import useAsync from "../../hooks/useAsync";
import isEmptySearch from "../../utils/isEmptySearch";
import postData from "../../utils/postData";

export default function useRemoteSearchFetch({ url }) {
  const [request, setRequest] = useState(null);

  const response = useAsync(
    () =>
      isEmptySearch(request) ? Promise.resolve(null) : postData(url, request),
    [JSON.stringify(request)],
  );

  return [
    {
      ...response,
    },
    (newRequest) => {
      if (!isEqual(request, newRequest)) {
        setRequest(newRequest);
      }
    },
  ];
}
