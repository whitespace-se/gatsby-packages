import { print } from "graphql";
import { request } from "graphql-request";
import { mergeAllWith, get } from "lodash/fp";

import { getIsolatedQuery, getQueryName } from "../src/utils/graphql";

import formatGraphQL from "./formatGraphQL";

const defaultMergeBatches = mergeAllWith((objValue, srcValue) => {
  if (Array.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
});

export default async function runBatchedWPQuery(
  params,
  pluginOptions,
  query,
  variables,
  {
    connection,
    cursor,
    hasNextPage,
    mergeBatches = defaultMergeBatches,
    nodesPerFetch,
  },
) {
  const {
    actions: { createNode },
    reporter,
    createNodeId,
    createContentDigest,
  } = params;
  const { wp: { url, nodesPerFetch: defaultNodesPerFetch } = {} } =
    pluginOptions;

  if (!url) {
    return;
  }

  let name = getQueryName(query);

  if (!name) {
    throw new Error(`Could not run batched query: Query name is missing`);
  }

  query = getIsolatedQuery(query, "wp", "WP");

  if (!nodesPerFetch) {
    nodesPerFetch = defaultNodesPerFetch;
  }

  if (typeof connection == "string" || Array.isArray(connection)) {
    connection = get(connection);
  }

  if (cursor == null) {
    if (!connection) {
      throw new Error(
        `Could not run batched query ${name}: Provide 'cursor' or 'connection' option to runBatchedWPQuery`,
      );
    }
    cursor = ({ data }) => connection({ data }).pageInfo.endCursor;
  } else if (typeof cursor == "string" || Array.isArray(cursor)) {
    cursor = get(cursor);
  }

  if (hasNextPage == null) {
    if (!connection) {
      throw new Error(
        `Could not run batched query ${name}: Provide 'hasNextPage' or 'connection' option to runBatchedWPQuery`,
      );
    }
    hasNextPage = ({ data }) => connection({ data }).pageInfo.hasNextPage;
  } else if (typeof hasNextPage == "string" || Array.isArray(hasNextPage)) {
    hasNextPage = get(hasNextPage);
  }

  let batches = [];
  let pageNumber = 0;
  reporter.info(`Running batched query "${name}"...`);
  async function runBatch(nextCursor) {
    try {
      reporter.info(`Fetching batch ${pageNumber + 1}...`);

      let data = await request(url, query, {
        ...variables,
        cursor: nextCursor,
      });

      batches.push({ data });

      if (hasNextPage({ data })) {
        pageNumber++;
        return runBatch(cursor({ data }));
      }
    } catch (error) {
      let formattedQuery = formatGraphQL(print(query));
      reporter.error(
        `Query error: ${error}

  Query:
  ${formattedQuery}

  Variables:
  ${JSON.stringify({ ...variables, cursor: nextCursor }, null, 2)}`,
      );
      throw error;
    }
  }
  await runBatch(null);
  let { data } = mergeBatches(batches);
  let stringifiedData = JSON.stringify(data);
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
  createNode(node);
  reporter.success(`Batched query "${name}" done`);
}
