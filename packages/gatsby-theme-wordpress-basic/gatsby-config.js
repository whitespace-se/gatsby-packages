const path = require("path");

const { format: formatDate } = require("date-fns");

function mixin(defaultOptions, options) {
  if (typeof options === "function") {
    return options(defaultOptions);
  }
  if (typeof options === "object") {
    return { ...defaultOptions, ...options };
  }
  return defaultOptions;
}

module.exports = ({
  basePath,
  fragmentsDir,
  wp,
  postCss = {},
  i18next = {},
  siteIndex = {},
  disableSearchPlugin,
  sitemap = {},
} = {}) => {
  return {
    plugins: [
      // We put this first so that all other `wrapPageElement` implementations will run after
      { resolve: `@whitespace/gatsby-plugin-page-wrapper` },

      // Enabled GraphQL fragments in Gatsby Node API
      {
        resolve: `gatsby-plugin-fragments`,
        options: {
          fragmentsDir,
        },
      },

      // Translation
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${basePath}/locales`,
          name: `locale`,
        },
      },
      { resolve: "@whitespace/gatsby-plugin-i18next", options: i18next },

      // CSS
      `gatsby-plugin-emotion`,
      {
        resolve: `gatsby-plugin-postcss`,
        options: postCss,
      },

      // HTML meta data
      `gatsby-plugin-react-helmet`,

      // Images
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: path.resolve(basePath, `./src/images`),
        },
      },
      `gatsby-transformer-sharp`,
      `gatsby-plugin-sharp`,

      // Wordpress integration
      {
        resolve: "gatsby-source-graphql",
        options: {
          typeName: "WP",
          fieldName: "wp",
          url: `${wp.url}/graphql`,
          refetchInterval: wp.refetchInterval,
        },
      },
      `gatsby-plugin-meta-redirect`,

      // Search
      ...(disableSearchPlugin
        ? []
        : [{ resolve: `@whitespace/gatsby-plugin-search` }]),

      // Site index
      {
        resolve: "@whitespace/gatsby-plugin-site-index",
        options: siteIndex
          ? {
              ...siteIndex,
            }
          : { disablePageCreation: true },
      },

      // Breadcrumbs
      `@whitespace/gatsby-plugin-breadcrumbs`,

      // Sitemap
      ...(sitemap
        ? [
            {
              resolve: `gatsby-plugin-sitemap`,
              options: mixin(
                {
                  sitemapSize: 5000,
                  query: `
                  {
                    site {
                      siteMetadata {
                        siteUrl
                      }
                    }
                    allSitePage {
                      edges {
                        node {
                          path
                          context {
                            contentType {
                              name
                            }
                            contentNode {
                              modifiedGmt
                            }
                          }
                        }
                      }
                    }
                  }
                `,
                  serialize: ({ site, allSitePage }) =>
                    allSitePage.edges.map(({ node: { path, context } }) => {
                      // let postType = context.contentType?.name;
                      let { modifiedGmt } = context?.contentNode || {};
                      return {
                        url: site.siteMetadata.siteUrl + path,
                        changefreq: `daily`,
                        priority: 0.7,
                        lastmod: formatDate(
                          modifiedGmt ? new Date(modifiedGmt) : new Date(),
                          `yyyy-MM-dd`,
                        ),
                      };
                    }),
                },
                sitemap,
              ),
            },
          ]
        : []),
    ],
  };
};
