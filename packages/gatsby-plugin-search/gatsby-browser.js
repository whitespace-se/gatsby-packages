import algoliasearch from "algoliasearch/lite";
import React, { useEffect, useRef } from "react";

import { algoliaContext, searchPluginConfigContext } from "./src/contexts";

function AlgoliaContextWrapper({
  children,
  appId,
  searchKey,
  hosts,
  indexName,
  ...restProps
}) {
  const searchClientRef = useRef();
  if (!searchClientRef.current && appId && searchKey && hosts && indexName) {
    searchClientRef.current = algoliasearch(appId, searchKey, { hosts });
  }
  return (
    <searchPluginConfigContext.Provider value={restProps}>
      <algoliaContext.Provider
        value={{ searchClient: searchClientRef.current, indexName }}
      >
        {children}
      </algoliaContext.Provider>
    </searchPluginConfigContext.Provider>
  );
}

export const wrapRootElement = (
  { element },
  { algolia: algoliaOptions, facets, archives },
) => {
  let indexName = algoliaOptions?.indexName;
  let {
    appId,
    searchKey,
    algoliasearchOptions: { hosts },
  } = algoliaOptions || {};
  return (
    <AlgoliaContextWrapper
      appId={appId}
      searchKey={searchKey}
      hosts={hosts}
      indexName={indexName}
      facets={facets}
      archives={archives}
    >
      {element}
    </AlgoliaContextWrapper>
  );
};
