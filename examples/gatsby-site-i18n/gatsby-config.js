module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/locales`,
        name: `locale`,
      },
    },
    {
      resolve: "@whitespace/gatsby-plugin-i18next",
      options: { languages: ["en", "sv"] },
    },
  ],
};
