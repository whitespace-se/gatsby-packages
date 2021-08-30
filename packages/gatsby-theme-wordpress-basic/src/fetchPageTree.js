import { print } from "graphql";
import { request } from "graphql-request";

import formatGraphQL from "../node/formatGraphQL";

import { getIsolatedQuery } from "./utils/graphql";

async function runBatchedQuery({
  url,
  query,
  variables,
  reporter,
  getCursor,
  hasNextPage,
}) {
  let batches = [];
  let pageNumber = 0;
  async function runBatch(cursor) {
    try {
      reporter.info(`Fetching batch ${pageNumber + 1}...`);

      let data = await request(url, query, { ...variables, cursor });

      batches.push({ data });

      if (hasNextPage({ data })) {
        pageNumber++;
        return runBatch(getCursor({ data }));
      }
    } catch (error) {
      let formattedQuery = formatGraphQL(print(query));
      reporter.error(
        `Query error: ${error}

  Query:
  ${formattedQuery}

  Variables:
  ${JSON.stringify({ ...variables, cursor }, null, 2)}`,
      );
      throw error;
    }
  }
  await runBatch(null);
  reporter.success("FETCH PAGE TREE");
  return batches;
}

export default async function fetchPageTree(params, pluginOptions) {
  const { gql, reporter, actions, createNodeId, createContentDigest } = params;
  const { createNode } = actions;
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
            ...WP_PageForPageTree
          }
        }
      }
    }
  `;

  query = getIsolatedQuery(query, "wp", "WP");

  let variables = { nodesPerFetch };

  let batches = await runBatchedQuery({
    url,
    query,
    variables,
    reporter,
    getCursor({ data }) {
      return data.pages.pageInfo.endCursor;
    },
    hasNextPage({ data }) {
      return data.pages.pageInfo.hasNextPage;
    },
  });
  let pages = batches.flatMap(({ data }) => {
    return data.pages.nodes;
  });
  let data = { pages };
  let stringifiedData = JSON.stringify(data);
  let name = "pageTree";
  const node = {
    name,
    data,
    id: createNodeId(`graphql-query-${name}`),
    parent: null,
    children: [],
    internal: {
      type: `GraphQlQuery`,
      mediaType: `application/json`,
      content: stringifiedData,
      contentDigest: createContentDigest(stringifiedData),
    },
  };
  reporter.success("*NODE CREATE");
  createNode(node);
}
