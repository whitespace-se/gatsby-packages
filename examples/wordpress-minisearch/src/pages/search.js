import {
  URLSearchParamsProvider,
  LazyMinisearchSearchBackendProvider,
  SearchContextDebug,
  SearchResults,
  SearchForm,
} from "@whitespace/gatsby-plugin-search";
import * as React from "react";
import * as yup from "yup";

// import { SearchHeader } from "../@whitespace/gatsby-theme-search/components/SearchHeader";

const SearchPage = () => {
  return (
    <div className="search">
      <div className="search__wrapper">
        <URLSearchParamsProvider
          schema={yup.object({
            query: yup.string().default(""),
            contentType: yup
              .string()
              .default("")
              .when("query", (query, schema) =>
                query ? schema : schema.strip(),
              ),
            tags: yup
              .array()
              .of(yup.string())
              .ensure()
              .when("contentType", (contentType, schema) =>
                ["post"].includes(contentType) ? schema : schema.strip(),
              ),
            year: yup
              .array()
              .of(yup.string())
              .ensure()
              .when("contentType", (contentType, schema) =>
                ["post"].includes(contentType) ? schema : schema.strip(),
              ),
            month: yup
              .array()
              .of(yup.string())
              .ensure()
              .when("contentType", (contentType, schema) =>
                ["post"].includes(contentType) ? schema : schema.strip(),
              ),
            sort: yup
              .string()
              .default("")
              .when("query", (query, schema) =>
                query ? schema : schema.strip(),
              ),
          })}
        >
          <LazyMinisearchSearchBackendProvider
            preload={true}
            settings={{
              attributesForFaceting: ["contentType"],
            }}
          >
            <SearchForm />
            {process.env.NODE_ENV !== "production" && (
              <details>
                <summary>Debug</summary>
                <SearchContextDebug />
              </details>
            )}
            <SearchResults />
          </LazyMinisearchSearchBackendProvider>
        </URLSearchParamsProvider>
      </div>
    </div>
  );
};

export default SearchPage;
