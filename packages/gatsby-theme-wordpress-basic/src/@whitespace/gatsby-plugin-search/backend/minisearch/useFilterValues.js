import { useStaticQuery, graphql } from "gatsby";

const useTaxonomyTerms = () => {
  return useStaticQuery(graphql`
    query TaxonomyTerms {
      wp {
        ...WP_TaxonomiesForHook
      }
    }
  `).wp;
};

export default function useFilterValues(taxonomy) {
  const taxonomies = useTaxonomyTerms();
  let filterValues = {};

  taxonomies[taxonomy]?.nodes.forEach(({ slug, name }) => {
    filterValues[slug] = name;
  });

  return filterValues;
}
