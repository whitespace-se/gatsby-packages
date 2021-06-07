import React from "react";

import { useSearch } from "../hooks";

export default function SearchContextDebug({ ...restProps }) {
  const context = useSearch();
  return (
    <pre {...restProps}>
      <code>{JSON.stringify(context, null, 2)}</code>
    </pre>
  );
}
