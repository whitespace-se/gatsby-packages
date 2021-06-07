import React, { useState } from "react";

import { siteSearchContext } from "../../src/hooks/search";

export function SiteSearchProvider({ children, pluginOptions }) {
  const { Provider } = siteSearchContext;
  const [query, setQuery] = useState("");

  return (
    <Provider
      value={{
        setQuery,
        query,
      }}
    >
      {children}
    </Provider>
  );
}
