import { useStaticQuery, graphql } from "gatsby";

export default function useTaxonomies() {
  let { wp, graphQlQuery } = useStaticQuery(graphql`
    query WPTaxonomies {
      wp {
        taxonomies {
          nodes {
            name
            id
            hierarchical
            graphqlSingleName
            ...WP_TaxonomyForHook
          }
        }
      }
      graphQlQuery(name: { eq: "BatchedWPTaxonomyTerms" }) {
        data
      }
    }
  `);

  let terms = graphQlQuery?.data?.terms?.nodes || [];

  let taxonomies = (wp.taxonomies?.nodes || []).map((taxonomy) => ({
    ...taxonomy,
    terms: terms.filter((term) => term.taxonomyName === taxonomy.name),
  }));

  return taxonomies;
}
