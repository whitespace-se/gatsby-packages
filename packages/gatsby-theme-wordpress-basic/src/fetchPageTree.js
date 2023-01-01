const runBatchedWPQuery = require("../node/runBatchedWPQuery");

module.exports = async function fetchPageTree(params, pluginOptions) {
  const { gql } = params;
  const { wp: { url, contentTypes = {}, nodesPerFetch = 100 } = {} } =
    pluginOptions;
  if (!url || contentTypes.page === false) {
    return;
  }

  let query = gql`
    query WPPaginatedNodesForPageTree($nodesPerFetch: Int, $cursor: String) {
      wp {
        pages(first: $nodesPerFetch, after: $cursor, where: { parent: null }) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            parentId
            databaseId # Required for sorting
            title
            isFrontPage
            uri
            menuOrder # Required for sorting
            ...WP_PageForPageTree
          }
        }
      }
    }
  `;

  let variables = { nodesPerFetch };

  await runBatchedWPQuery(params, pluginOptions, query, variables, {
    connection: "data.pages",
  });
};
