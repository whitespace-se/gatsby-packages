import jsYaml from "js-yaml";
import gql from "tagged-template-noop";
import toml from "toml";

export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(gql`
    type Locale implements Node {
      id: ID!
      language: String!
      data: JSON!
    }
  `);
};

export const onCreateNode = async (
  { node, actions, loadNodeContent, createNodeId, createContentDigest },
  { localeFileSourceName = "locale" },
) => {
  const {
    internal: { mediaType, type },
    sourceInstanceName,
    name,
    id,
  } = node;

  // User is not using this feature
  if (localeFileSourceName == null) {
    return;
  }

  // Currently only support file resources
  if (type !== "File") {
    return;
  }

  if (sourceInstanceName !== localeFileSourceName) {
    return;
  }

  const language = name;
  const content = await loadNodeContent(node);
  let data;

  switch (mediaType) {
    case "text/yaml":
      data = jsYaml.load(content);
      break;
    case "application/toml":
      data = toml.parse(content);
      break;
    case "application/json":
      data = JSON.parse(content);
      break;
    default:
      return;
  }

  const { createNode, createParentChildLink } = actions;

  const localeNode = {
    id: createNodeId(`${id} >>> Locale`),
    children: [],
    parent: id,
    internal: {
      // content: data,
      contentDigest: createContentDigest(data),
      type: `Locale`,
    },
    language,
    data,
  };

  createNode(localeNode);

  createParentChildLink({ parent: node, child: localeNode });
};
