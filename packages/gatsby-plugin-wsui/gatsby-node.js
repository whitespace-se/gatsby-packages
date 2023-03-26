const { mergeThemes } = require("@wsui/base");

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type WsuiTheme implements Node {
      definition: JSON
    }
  `);
};

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest, reporter, graphql },
  pluginOptions,
) => {
  const { createNode } = actions;

  let { query, transform, theme } = pluginOptions;

  if (query) {
    let result = await graphql(query);
    let transformedResult = transform ? transform(result) : result;
    theme = mergeThemes(theme, transformedResult);
  }

  reporter.info(`Creating WsuiTheme node`);

  let node = {
    definition: theme,
  };

  createNode({
    ...node,
    id: createNodeId(`wsui-theme`),
    parent: null,
    children: [],
    internal: {
      type: `WsuiTheme`,
      contentDigest: createContentDigest(node),
    },
  });
};
