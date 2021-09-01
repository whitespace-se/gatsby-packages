import runBatchedWPQuery from "../node/runBatchedWPQuery";

export default async function fetchSearchDocuments(params, pluginOptions) {
  const { gql } = params;
  const { wp: { url, contentTypes = {}, nodesPerFetch = 100 } = {} } =
    pluginOptions;
  if (!url || contentTypes.page === false) {
    return;
  }

  let query = gql`
    query WPPagesForMiniSearch($nodesPerFetch: Int, $cursor: String) {
      wp {
        pages: contentNodes(
          first: $nodesPerFetch
          after: $cursor
          where: { contentTypes: [PAGE] }
        ) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            ...WP_ContentNodeForSearch
          }
        }
      }
    }
  `;

  let variables = { nodesPerFetch };

  await runBatchedWPQuery(params, pluginOptions, query, variables, {
    connection: "data.pages",
  });

  query = gql`
    query WPPostsForMiniSearch($nodesPerFetch: Int, $cursor: String) {
      wp {
        posts: contentNodes(
          first: $nodesPerFetch
          after: $cursor
          where: { contentTypes: [POST] }
        ) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            ...WP_ContentNodeForSearch
          }
        }
      }
    }
  `;

  await runBatchedWPQuery(params, pluginOptions, query, variables, {
    connection: "data.posts",
  });
}
