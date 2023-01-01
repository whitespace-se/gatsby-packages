module.exports = function getIncludedTaxonomies(
  params,
  pluginOptions,
  taxonomies,
) {
  // const { reporter } = params;
  return Object.entries({
    tag: {},
    category: {},
    ...pluginOptions.wp.taxonomies,
  })
    .filter(([, overrides]) => overrides)
    .map(([graphqlSingleName, overrides]) => {
      let taxonomy = {
        graphqlSingleName,
        ...(taxonomies &&
          taxonomies.find(
            (taxonomy) => taxonomy.graphqlSingleName === graphqlSingleName,
          )),
        ...overrides[graphqlSingleName],
      };
      if (taxonomy.enum == null) {
        let inferredEnum = taxonomy.graphqlSingleName.toUpperCase();
        taxonomy.enum = inferredEnum;
      }
      return taxonomy;
    });
};
