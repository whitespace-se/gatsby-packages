import getIncludedTaxonomies from "../node/getIncludedTaxonomies";
import runBatchedWPQuery from "../node/runBatchedWPQuery";

export default async function fetchTaxonomyTerms(params, pluginOptions) {
  const { gql } = params;
  const { wp: { url, nodesPerFetch = 100 } = {} } = pluginOptions;
  if (!url) {
    return;
  }

  let query = gql`
    query BatchedWPTaxonomyTerms(
      $nodesPerFetch: Int
      $cursor: String
      $taxonomies: [TaxonomyEnum]
    ) {
      wp {
        terms(
          first: $nodesPerFetch
          after: $cursor
          where: { taxonomies: $taxonomies }
        ) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            id
            taxonomyName
            ... on HierarchicalTermNode {
              parentId
            }
            ...WP_TaxonomyTerm
          }
        }
      }
    }
  `;

  let variables = {
    nodesPerFetch,
    taxonomies: getIncludedTaxonomies(params, pluginOptions)
      .filter((taxonomy) => taxonomy)
      .map((taxonomy) => taxonomy.enum),
  };

  await runBatchedWPQuery(params, pluginOptions, query, variables, {
    connection: "data.terms",
  });
}
