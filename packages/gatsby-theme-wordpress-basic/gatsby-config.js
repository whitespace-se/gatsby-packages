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
  fragmentsDir = "./src/fragments",
  siteMetadata,
  wsui,
  wp,
  postCss = {},
  i18next = {},
  siteIndex = {},
  breadcrumbs = {},
  disableSearchPlugin,
  sitemap = {},
  manifest = {},
  robotsTxt: { disallowAll: robotsTxtDisallowAll, ...robotsTxt } = {},
  search,
} = {}) => {
  fragmentsDir = path.resolve(basePath, fragmentsDir);
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

      // WSUI
      ...(wsui
        ? [
            {
              resolve: `@whitespace/gatsby-plugin-wsui`,
              options: { ...wsui },
            },
          ]
        : []),

      // Search
      ...(disableSearchPlugin
        ? []
        : [
            {
              resolve: `@whitespace/gatsby-plugin-search`,
              options: {
                wsui,
                fragmentsDir,
                ...search,
              },
            },
          ]),

      // Site index
      {
        resolve: "@whitespace/gatsby-plugin-site-index",
        options: siteIndex
          ? {
              template: wsui
                ? require.resolve(
                    "@whitespace/gatsby-plugin-site-index/src/wsui/components/SiteIndexTemplate.jsx",
                  )
                : undefined,
              ...siteIndex,
            }
          : { disablePageCreation: true },
      },

      // Breadcrumbs
      {
        resolve: `@whitespace/gatsby-plugin-breadcrumbs`,
        options: { ...breadcrumbs },
      },

      // Manifest
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          ...manifest,
        },
      },

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

      {
        resolve: "gatsby-plugin-robots-txt",
        options: mixin(
          {
            sitemap: `${siteMetadata.siteUrl}/sitemap.xml`,
            policy: robotsTxtDisallowAll
              ? [
                  {
                    userAgent: "*",
                    disallow: "/",
                  },
                ]
              : [
                  {
                    userAgent: "*",
                    allow: "/",
                  },
                ],
          },
          robotsTxt,
        ),
      },
    ],
  };
};

exports.pluginOptionsSchema = ({ Joi }) => {
  return Joi.object({
    basePath: Joi.string().required(),
    fragmentsDir: Joi.string().default("./src/fragments"),
    siteMetadata: Joi.object({
      siteUrl: Joi.string().required(),
    }).required(),
    wp: Joi.object({
      url: Joi.string().required(),
      refetchInterval: Joi.number(),
    }),
    postCss: Joi.object(),
    // i18next: Joi.object(),
    // siteIndex: Joi.object(),
    disableSearchPlugin: Joi.boolean().default(false),
    // sitemap: Joi.object(),
    manifest: Joi.object(),
    robotsTxt: Joi.object(),
  });
};
