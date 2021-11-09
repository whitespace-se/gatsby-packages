export default function getOptionsFromTaxonomy(taxonomyGraphqlSingleName) {
  return ({
    // facets,
    taxonomies,
  }) => {
    let terms =
      taxonomies.find(
        (taxonomy) => taxonomy.graphqlSingleName === taxonomyGraphqlSingleName,
      )?.terms || [];
    return terms.map(({ slug, name }) => ({
      // label: `${name} (${facets?.terms?.[slug] || 0})`,
      // count: facets?.terms?.[slug] || 0,
      label: name,
      value: slug,
    }));
  };
}
