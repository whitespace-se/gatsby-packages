import { ApolloProvider, useQuery } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import {
  IntrospectionFragmentMatcher,
  InMemoryCache,
} from "apollo-cache-inmemory";
import { useStaticQuery, graphql } from "gatsby";
import { prependUsedFragments } from "gatsby-plugin-fragments/browser";
import React, { useMemo } from "react";

import { getIsolatedQuery } from "../utils/graphql";
import introspectionQueryResultData from "../wp-fragment-types";

const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData,
});

const cache = new InMemoryCache({ fragmentMatcher });

/**
 * Extracts credentials from the url and returns them alongside the url without
 * credentials.
 * @param {string} urlString The URL as a string
 */
const extractURLCredentials = (urlString) => {
  const url = new URL(urlString);
  const { username, password } = url;
  url.username = "";
  url.password = "";
  const { href } = url;
  return { username, password, href };
};

const GRAPHQL_URL = `${process.env.GATSBY_WORDPRESS_URL}/graphql`;

export const client = new ApolloClient({
  cache,
  uri: extractURLCredentials(GRAPHQL_URL).href,
});

export function WPGraphQLProvider({ ...restProps }) {
  return <ApolloProvider client={client} {...restProps} />;
}

export function withWPGraphQL(Component) {
  const WrappedComponent = ({ ...restProps }) => (
    <WPGraphQLProvider>
      <Component {...restProps} />
    </WPGraphQLProvider>
  );
  WrappedComponent.displayName = `WithWPGraphQLProvider(${Component.displayName})`;
  return WrappedComponent;
}

export function useWPGraphQLQuery(query, context, ...args) {
  const fragments = useStaticQuery(graphql`
    query {
      allGraphQlFragment {
        nodes {
          source
        }
      }
    }
  `).allGraphQlFragment.nodes.map((node) => node.source);

  const isolatedQuery = useMemo(() => {
    return getIsolatedQuery(prependUsedFragments(fragments, query), "wp", "WP");
  }, [query]);

  const { username, password } = extractURLCredentials(GRAPHQL_URL);
  if (username || password) {
    context.headers = {
      ...context.headers,
      Authorization: `Basic ${btoa(username + ":" + password)}`,
    };
  }

  return useQuery(isolatedQuery, context, ...args);
}
