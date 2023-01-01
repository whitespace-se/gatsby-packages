const { Immer } = require("immer");
const jsYaml = require("js-yaml");
const { isEqual } = require("lodash");
const gql = require("tagged-template-noop");
const toml = require("toml");

const {
  produce,
  // current,
} = new Immer({
  autoFreeze: false,
});

const inferLanguageFromPath = ({ languages, defaultLanguage } = {}) => {
  let nonDefaultLanguages = languages.filter(
    (lang) => lang !== defaultLanguage,
  );
  let re = new RegExp(`^\\/(${nonDefaultLanguages.join("|")})(\\/.*)`);
  return (path) => {
    let matches = (path.match(re) || [path, null, path]).slice(1);
    return matches;
  };
};

const fixPageLocalization = (pluginOptions, { reporter }) => {
  let langFromPath = inferLanguageFromPath(pluginOptions);
  return (page) => {
    let { path } = page;
    let { language: explicitLanguage } = page.context;
    let [inferredLanguage, unlocalizedPath] = langFromPath(path);
    let { defaultLanguage } = pluginOptions;
    let language = explicitLanguage || inferredLanguage || defaultLanguage;

    if (
      inferredLanguage &&
      explicitLanguage &&
      inferredLanguage !== explicitLanguage
    ) {
      reporter.warn(
        `Page path ${path} does not match explicit page language ${explicitLanguage}. Path will be changed to ${unlocalizedPath}`,
      );
    }
    page.path =
      language === defaultLanguage
        ? unlocalizedPath
        : `/${language}${unlocalizedPath}`;
    page.context.language = language;
  };
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(gql`
    type Locale implements Node {
      id: ID!
      language: String!
      data: JSON!
    }
  `);
};

exports.onCreateNode = async (
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

exports.onCreatePage = ({ page, actions, reporter }, pluginOptions) => {
  const { createPage, deletePage } = actions;
  let newPage = [fixPageLocalization]
    .map((callback) => callback(pluginOptions, { reporter }))
    .reduce((page, callback) => produce(page, callback), page);

  if (!isEqual(page, newPage)) {
    // try {
    deletePage(page);
    createPage(newPage);
    // } catch (error) {
    //   console.log(page, newPage);
    //   throw error;
    // }
  }
};
