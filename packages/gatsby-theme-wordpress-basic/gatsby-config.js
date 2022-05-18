const path = require("path");

module.exports = ({
  basePath,
  fragmentsDir,
  wp,
  postCss = {},
  i18next = {},
  siteIndex = false,
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
      `@whitespace/gatsby-plugin-search`,

      // Page Index
      ...(siteIndex
        ? [
            {
              resolve: "@whitespace/gatsby-plugin-site-index",
              options: {
                ...siteIndex,
              },
            },
          ]
        : []),

      // Breadcrumbs
      `@whitespace/gatsby-plugin-breadcrumbs`,
    ],
  };
};
