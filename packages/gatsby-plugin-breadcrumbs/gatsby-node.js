import { findLastIndex } from "lodash";

export const createSchemaCustomization = ({ actions }) => {
  // const { createTypes } = actions;
  // const typeDefs = `
  //   type SitePage {
  //     parentPage: SitePage
  //     ancestorPages: [SitePage]!
  //   }
  // `;
  // createTypes(typeDefs);
};

export const createResolvers = ({ createResolvers }) => {
  createResolvers({
    SitePage: {
      parentPage: {
        type: "SitePage",
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
        resolve: async (source, args, context, info) => {
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
            (page) => page && page.context && page.context.isFrontPage,
          );

          return ancestorPages.slice(frontPageIndex > 0 ? frontPageIndex : 0);
        },
      },
    },
  });
};
