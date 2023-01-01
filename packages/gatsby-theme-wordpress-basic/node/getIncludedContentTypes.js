const { snakeCase } = require("lodash");

module.exports = function getIncludedContentTypes(
  params,
  pluginOptions,
  contentTypes,
) {
  const { reporter } = params;
  return Object.entries({
    post: {},
    page: {},
    ...pluginOptions.wp.contentTypes,
  })
    .filter(([, overrides]) => overrides)
    .map(([name, overrides]) => {
      let contentType = {
        name,
        ...(contentTypes &&
          contentTypes.find((contentType) => contentType.name === name)),
        ...overrides[name],
      };
      if (contentType.enum == null) {
        let inferredEnum = snakeCase(contentType.name).toUpperCase();
        let oldEnum =
          contentType.graphqlSingleName &&
          snakeCase(contentType.graphqlSingleName).toUpperCase();
        if (oldEnum && oldEnum !== inferredEnum) {
          reporter.warn(
            `Inferred enum for content type "${contentType.name}" has changed from "${oldEnum}" to "${inferredEnum}". Update your queries or override the inferred enum for this content type in your config for the gatsby-theme-wordpress-basic plugin.`,
          );
        }
        contentType.enum = inferredEnum;
      }
      return contentType;
    });
};
