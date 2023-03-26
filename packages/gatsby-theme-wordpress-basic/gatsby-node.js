const path = require("path");

const { collectFragments } = require("gatsby-plugin-fragments/node");

const getIncludedContentTypes = require("./node/getIncludedContentTypes");
const createPagesForContentNodes = require("./src/createPages");
const fetchPageTree = require("./src/fetchPageTree");
const fetchSearchDocuments = require("./src/fetchSearchDocuments");
const fetchTaxonomyTerms = require("./src/fetchTaxonomyTerms");

const SearchTemplate = require.resolve("./src/templates/SearchTemplate");
const AlgoliaSearchTemplate = require.resolve(
  "./src/templates/AlgoliaSearchTemplate",
);

if (
  new Intl.DateTimeFormat("es", { month: "long" }).format(new Date(9e8)) !==
  "enero"
) {
  console.warn(
    `ICU data is not loaded. NODE_ICU_DATA="${process.env.NODE_ICU_DATA}"`,
  );
}

let absoluteComponentPath;

exports.onPreInit = ({ store }, { wsui }) => {
  // path.join(
  //   store.getState().program.directory,
  //   defaultLayoutComponentPath,
  // )
  let component = wsui
    ? `@whitespace/gatsby-theme-wordpress-basic/src/wsui-components/SiteLayout.js`
    : `@whitespace/gatsby-theme-wordpress-basic/src/components/SiteLayout.js`;
  // let component = `@whitespace/gatsby-theme-wordpress-basic/src/components/SiteLayout.js`;

  absoluteComponentPath = component;
};

exports.onCreateWebpackConfig = ({ actions, plugins }) => {
  actions.setWebpackConfig({
    plugins: [
      plugins.define({
        GATSBY_LAYOUT_COMPONENT_PATH: JSON.stringify(absoluteComponentPath),
      }),
    ],
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type SitePageContext {
      isArchivePage: Boolean
    }
  `);

  createTypes(`
    type GraphQlQuery implements Node @dontInfer {
      name: String!
      data: JSON!
    }
  `);
};

exports.sourceNodes = async function sourceNodes(params, pluginOptions) {
  const { gql } = await collectFragments(pluginOptions);
  await fetchPageTree({ ...params, gql }, pluginOptions);
  await fetchSearchDocuments({ ...params, gql }, pluginOptions);
  await fetchTaxonomyTerms({ ...params, gql }, pluginOptions);
};

exports.createPages = async function createPages(params, pluginOptions) {
  const { graphql, reporter, actions } = params;
  const { createPage } = actions;
  let {
    wp: { url, nodesPerFetch } = {},
    search: { paths: searchPagePaths = [], algolia: algoliaOptions } = {},
  } = pluginOptions;
  const { gql } = await collectFragments(pluginOptions);
  reporter.info(`GATSBY_WORDPRESS_URL: ${url}`);
  if (nodesPerFetch == null) {
    if (process.env.WORDPRESS_PAGES_PER_FETCH != null) {
      reporter.warn(
        `gatsby-theme-wordpress-basic no longer uses the WORDPRESS_PAGES_PER_FETCH env var directly. Instead add 'wp.nodesPerFetch' to your plugin config.`,
      );
    }
    nodesPerFetch = 100;
  }
  if (url) {
    let {
      data: {
        wp: {
          contentTypes: { nodes: contentTypes },
        },
      },
    } = await graphql(gql`
      query WPcontentTypesQuery {
        wp {
          contentTypes(first: 1000) {
            nodes {
              name
              graphqlSingleName
              labels {
                singularName
                name
                menuName
                archives
              }
              hasArchive
              uri
            }
          }
        }
      }
    `);

    contentTypes = getIncludedContentTypes(params, pluginOptions, contentTypes);

    await Promise.all(
      contentTypes.map(async (contentType) => {
        const query = gql`
          query WPPaginatedNodesForPagesQuery(
            $first: Int
            $after: String
            $nameIn: [String]
            $contentTypes: [WP_ContentTypeEnum]
          ) {
            wp {
              contentNodes(
                first: $first
                after: $after
                where: {
                  nameIn: $nameIn
                  parent: null
                  contentTypes: $contentTypes
                }
              ) {
                pageInfo {
                  hasNextPage
                  endCursor
                }
                nodes {
                  archiveDates
                  modifiedGmt # Required for sitemap
                  ...WP_ContentNodeForPage
                }
              }
            }
          }
        `;

        await createPagesForContentNodes({
          contentType,
          query,
          nodesPerFetch,
        })({ ...params, gql }, pluginOptions);
      }),
    );
  }

  if (Array.isArray(searchPagePaths)) {
    searchPagePaths = Object.keys(searchPagePaths).reduce(
      (obj, key) => ((obj[key] = {}), obj),
      {},
    );
  }
  Object.entries(searchPagePaths).forEach(([path, page]) => {
    createPage({
      path,
      component: algoliaOptions ? AlgoliaSearchTemplate : SearchTemplate,
      ...page,
      context: {
        title: "Search",
        isSearch: true,
        ...page?.context,
      },
    });
  });
};
