const getIncludedContentTypes = require("../node/getIncludedContentTypes");
const runBatchedWPQuery = require("../node/runBatchedWPQuery");

module.exports = async function fetchSearchDocuments(params, pluginOptions) {
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
      $nameIn: [String]
    ) {
      wp {
        contentNodes: contentNodes(
          first: $nodesPerFetch
          after: $cursor
          where: { contentTypes: $contentTypes, nameIn: $nameIn }
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
    nameIn:
      (process.env.WORDPRESS_SPECIFIC_POSTS &&
        process.env.WORDPRESS_SPECIFIC_POSTS.split(",")) ||
      [],
  };

  await runBatchedWPQuery(params, pluginOptions, query, variables, {
    connection: "data.contentNodes",
  });
};
