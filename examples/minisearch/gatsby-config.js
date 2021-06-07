module.exports = {
  siteMetadata: {
    title: "Example",
  },
  plugins: [
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require(`postcss-preset-env`)({
            preserve: true,
            stage: 0,
          }),
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "page",
        path: `${__dirname}/src/markdown-pages`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "contact",
        path: `${__dirname}/src/contacts`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {},
    },
    {
      resolve: `gatsby-transformer-yaml`,
      options: {},
    },
    {
      resolve: `@whitespace/gatsby-plugin-search`,
      options: {},
    },
  ],
};
