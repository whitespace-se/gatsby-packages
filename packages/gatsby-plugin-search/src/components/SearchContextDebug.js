import React from "react";

import { useSearch } from "../hooks";

export default function SearchContextDebug({ ...restProps }) {
  const context = useSearch();
  let output;
  try {
    output = JSON.stringify(context, null, 2);
  } catch {
    // Do nothing
  }
  return (
    <pre {...restProps}>
      <code>{output}</code>
    </pre>
  );
}
