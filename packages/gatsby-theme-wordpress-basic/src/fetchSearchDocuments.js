import getIncludedContentTypes from "../node/getIncludedContentTypes";
import runBatchedWPQuery from "../node/runBatchedWPQuery";

export default async function fetchSearchDocuments(params, pluginOptions) {
  const { gql } = params;
  const { wp: { url, nodesPerFetch = 100 } = {} } = pluginOptions;
  if (!url) {
    return;
  }

  let query = gql`
    query WPContentNodesForMiniSearch(
      $nodesPerFetch: Int
      $cursor: String
      $contentTypes: [WP_ContentTypeEnum]
    ) {
      wp {
        contentNodes: contentNodes(
          first: $nodesPerFetch
          after: $cursor
          where: { contentTypes: $contentTypes }
        ) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            contentType {
              node {
                name
              }
            }
            ...WP_ContentNodeForSearch
          }
        }
      }
    }
  `;

  let variables = {
    nodesPerFetch,
    contentTypes: getIncludedContentTypes(params, pluginOptions)
      .filter((contentType) => contentType && contentType.hasArchive !== false)
      .map((contentType) => contentType.enum),
  };

  await runBatchedWPQuery(params, pluginOptions, query, variables, {
    connection: "data.contentNodes",
  });
}
