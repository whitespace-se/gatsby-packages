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
    `gatsby-plugin-react-helmet`,
    {
      resolve: `@whitespace/gatsby-plugin-cookie-consent`,
      options: {},
    },
    {
      resolve: `@whitespace/gatsby-plugin-matomo`,
      options: {
        // routeChangeEventName: "mtm.PageView",
        routeChangeEventName: false,
        trackPageViews: true,
        mtmContainerId: "container_fh3MwuUb",
        mtmHost: "https://whitespace.analys.co",
        includeInDevelopment: true,
        requireCookieConsent: true,
      },
    },
  ],
};
