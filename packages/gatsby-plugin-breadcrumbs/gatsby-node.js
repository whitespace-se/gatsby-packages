const { findLastIndex } = require("lodash");

const defaultIsTopLevelPage = (page) => page?.context?.isFrontPage;

exports.createResolvers = (
  { createResolvers },
  { isTopLevelPage = defaultIsTopLevelPage },
) => {
  createResolvers({
    SitePage: {
      parentPage: {
        type: "SitePage",
        // eslint-disable-next-line no-unused-vars
        resolve: (source, args, context, info) => {
          let parentPath = source.path
            .split("/")
            .filter(Boolean)
            .slice(0, -1)
            .join("/");
          return context.nodeModel.findOne({
            query: {
              filter: { path: { in: [`/${parentPath}`, `/${parentPath}/`] } },
            },
            type: "SitePage",
          });
        },
      },
      ancestorPages: {
        type: "[SitePage]!",
        // eslint-disable-next-line no-unused-vars
        resolve: async (source, args, context, info) => {
          if (!!source && isTopLevelPage(source, defaultIsTopLevelPage)) {
            return [];
          }
          let pathParts = source.path.split("/").filter(Boolean);
          let ancestorPages = await Promise.all(
            pathParts.map((part, index) => {
              let parentPath = pathParts.slice(0, index).join("/");
              return context.nodeModel.findOne({
                query: {
                  filter: {
                    path: { in: [`/${parentPath}`, `/${parentPath}/`] },
                  },
                },
                type: "SitePage",
              });
            }),
          );

          // Fix for localized front pages
          let frontPageIndex = findLastIndex(
            ancestorPages,
            // defaultIsTopLevelPage,
            (page) => !!page && isTopLevelPage(page, defaultIsTopLevelPage),
          );

          return ancestorPages.slice(frontPageIndex > 0 ? frontPageIndex : 0);
        },
      },
    },
  });
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type SitePageContext {
      title: String
      isArchivePage: Boolean
      isSiteIndexPage: Boolean
      label: String
    }
  `);
};
