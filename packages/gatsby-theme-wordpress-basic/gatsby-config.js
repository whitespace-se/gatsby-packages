const path = require("path");

module.exports = ({
  basePath,
  fragmentsDir,
  wp,
  postCss = {},
  i18next = {},
} = {}) => {
  return {
    plugins: [
      // We put this first so that all other `wrapPageElement` implementations will run after
      { resolve: `@whitespace/gatsby-plugin-page-wrapper` },

      {
        resolve: `gatsby-plugin-fragments`,
        options: {
          fragmentsDir,
        },
      },

      {
        resolve: `gatsby-source-filesystem`,
        options: {
          path: `${basePath}/locales`,
          name: `locale`,
        },
      },

      { resolve: "@whitespace/gatsby-plugin-i18next", options: i18next },

      `gatsby-plugin-emotion`,

      {
        resolve: `gatsby-plugin-postcss`,
        options: postCss,
      },

      `gatsby-plugin-react-helmet`,

      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: path.resolve(basePath, `./src/images`),
        },
      },

      `gatsby-transformer-sharp`,

      `gatsby-plugin-sharp`,

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
    ],
  };
};
