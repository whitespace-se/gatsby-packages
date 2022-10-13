import runBatchedWPQuery from "../node/runBatchedWPQuery";

export default async function fetchPageTree(params, pluginOptions) {
  const { gql } = params;
  const { wp: { url, contentTypes = {}, nodesPerFetch = 100 } = {} } =
    pluginOptions;
  if (!url || contentTypes.page === false) {
    return;
  }

  let query = gql`
    query WPPaginatedNodesForPageTree($nodesPerFetch: Int, $cursor: String) {
      wp {
        pages(
          first: $nodesPerFetch
          after: $cursor
          where: { parent: null, orderby: { field: MENU_ORDER, order: ASC } }
        ) {
          pageInfo {
            hasNextPage
            endCursor
          }
          nodes {
            id
            parentId
            title
            isFrontPage
            uri
            menuOrder
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
}
