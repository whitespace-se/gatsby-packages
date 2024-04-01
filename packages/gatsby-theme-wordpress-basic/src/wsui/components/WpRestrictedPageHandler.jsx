import { gql } from "apollo-boost";
import React from "react";

import { PageContextProvider } from "../../hooks";
import { useWPGraphQLQuery, withWPGraphQL } from "../../hooks/wpGraphQL";

import WpPreviewErrorScreen from "./WpPreviewErrorScreen.jsx";
import WpPreviewLoadingScreen from "./WpPreviewLoadingScreen.jsx";
import WpPreviewTemplate from "./WpPreviewTemplate.jsx";

import Template from "../templates/DefaultTemplate.jsx";

const PREVIEW_QUERY = gql`
  query PreviewQuery($id: ID!) {
    wp {
      contentNode(id: $id) {
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

const WpPreview = withWPGraphQL(function WpRestrictedPageHandler({
  id,
  password,
}) {
  const context = {
    headers: {
      "X-WP-Post-Password": password,
    },
    credentials: "include",
  };

  const { loading, error, data } = useWPGraphQLQuery(PREVIEW_QUERY, {
    context,
    fetchPolicy: "network-only",
    variables: { id },
  });

  if (loading) {
    return <WpPreviewLoadingScreen label={"Hämtar sida…"} />;
  }
  if (error) {
    return <WpPreviewErrorScreen label={"Ett fel inträffade"} error={error} />;
  }

  const { contentNode } = data;

  const pageContext = { ...contentNode, isPreview: true };

  return (
    <PageContextProvider value={pageContext}>
      <Template pageContext={pageContext} />
    </PageContextProvider>
  );
});

export default WpPreview;
