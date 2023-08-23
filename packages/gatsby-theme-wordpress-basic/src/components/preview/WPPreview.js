import { gql } from "apollo-boost";
import React from "react";

import { PageContextProvider } from "../../hooks";
import { useWPGraphQLQuery, withWPGraphQL } from "../../hooks/wpGraphQL";

import WPPreviewErrorScreen from "./WPPreviewErrorScreen";
import WPPreviewLoadingScreen from "./WPPreviewLoadingScreen";
import WPPreviewTemplate from "./WPPreviewTemplate";

const PREVIEW_QUERY = gql`
  query PreviewQuery($id: ID!) {
    wp {
      contentNode(id: $id, asPreview: true) {
        contentType {
          node {
            name
            graphqlSingleName
          }
        }
        ...WP_ContentNodeForPage
      }
    }
  }
`;

const WPPreview = withWPGraphQL(function WPPreview({ id, wpnonce, user }) {
  const context = {
    headers: {
      "X-WP-Nonce": wpnonce,
      "X-WP-User": user,
    },
    credentials: "include",
  };

  const { loading, error, data } = useWPGraphQLQuery(PREVIEW_QUERY, {
    context,
    fetchPolicy: "network-only",
    variables: { id },
  });

  if (loading) {
    return <WPPreviewLoadingScreen label={"Hämtar förhandsgranskning"} />;
  }
  if (error) {
    return <WPPreviewErrorScreen label={"Ett fel inträffade"} error={error} />;
  }

  const { contentNode } = data;

  const pageContext = { contentNode, isPreview: true };

  return (
    <PageContextProvider value={pageContext}>
      <WPPreviewTemplate pageContext={pageContext} />
    </PageContextProvider>
  );
});

export default WPPreview;
