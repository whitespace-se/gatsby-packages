import { useStaticQuery, graphql } from "gatsby";

const useTaxonomies = () => {
//   return useStaticQuery(graphql`
//     query FilterTaxonomies {
//     }
//  `)
};

export default function useFilterValues($taxonomy) {
  const taxonomies = useTaxonomies();
  let filterValues = {};

  taxonomies[$taxonomy]?.nodes.map(
    ({ slug, name }) => (filterValues[slug] = name),
  );

  return filterValues;
}
