module.exports = {
  siteMetadata: {
    title: "Example",
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: "page",
        path: `${__dirname}/src/markdown-pages`,
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
      resolve: `@whitespace/gatsby-plugin-cookie-consent`,
      options: {},
    },
  ],
};
