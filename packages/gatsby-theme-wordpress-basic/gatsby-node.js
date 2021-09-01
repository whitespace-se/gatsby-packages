import { collectFragments } from "gatsby-plugin-fragments/node";
import { snakeCase } from "lodash";

import createPagesForContentNodes from "./src/createPages";
import fetchPageTree from "./src/fetchPageTree";
import fetchSearchDocuments from "./src/fetchSearchDocuments";

if (
  new Intl.DateTimeFormat("es", { month: "long" }).format(new Date(9e8)) !==
  "enero"
) {
  console.warn(
    `ICU data is not loaded. NODE_ICU_DATA="${process.env.NODE_ICU_DATA}"`,
  );
}

export const createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  const typeDefs = `
    type GraphQlQuery implements Node @dontInfer {
      name: String!
      data: JSON!
    }
  `;
  createTypes(typeDefs);
};

export async function sourceNodes(params, pluginOptions) {
  const { gql } = await collectFragments(pluginOptions);
  await fetchPageTree({ ...params, gql }, pluginOptions);
  await fetchSearchDocuments({ ...params, gql }, pluginOptions);
}

export async function createPages(params, pluginOptions) {
  const { graphql, reporter } = params;
  let {
    wp: {
      url,
      contentTypes: includedContentTypes = { post: {}, page: {} },
      nodesPerPage,
    } = {},
  } = pluginOptions;
  const { gql } = await collectFragments(pluginOptions);
  reporter.info(`GATSBY_WORDPRESS_URL: ${url}`);
  if (nodesPerPage == null) {
    if (process.env.WORDPRESS_PAGES_PER_FETCH != null) {
      reporter.warn(
        `gatsby-theme-wordpress-basic no longer uses the WORDPRESS_PAGES_PER_FETCH env var directly. Instead add 'wp.nodesPerFetch' to your plugin config.`,
      );
    }
    nodesPerPage = 100;
  }
  if (url) {
    let {
      data: {
        wp: {
          contentTypes: { nodes: contentTypes },
        },
      },
    } = await graphql(gql`
      query WPcontentTypesQuery {
        wp {
          contentTypes {
            nodes {
              name
              graphqlSingleName
              labels {
                singularName
                name
                menuName
                archives
              }
              hasArchive
              uri
            }
          }
        }
      }
    `);
    await Promise.all(
      contentTypes
        .filter((contentType) => includedContentTypes[contentType.name])
        .map(async (contentType) => {
          const query = gql`
            query WPPaginatedNodesForPagesQuery(
              $first: Int
              $after: String
              $nameIn: [String]
              $contentTypes: [WP_ContentTypeEnum]
            ) {
              wp {
                contentNodes(
                  first: $first
                  after: $after
                  where: {
                    nameIn: $nameIn
                    parent: null
                    contentTypes: $contentTypes
                  }
                ) {
                  pageInfo {
                    hasNextPage
                    endCursor
                  }
                  nodes {
                    archiveDates
                    ...WP_ContentNodeForPage
                  }
                }
              }
            }
          `;

          let inferredEnum = snakeCase(contentType.name).toUpperCase();
          let oldEnum = snakeCase(contentType.graphqlSingleName).toUpperCase();
          if (oldEnum !== inferredEnum) {
            reporter.warn(
              `Inferred enum for content type "${contentType.name}" has changed from "${oldEnum}" to "${inferredEnum}". Update your queries or override the inferred enum for this content type in your config for the gatsby-theme-wordpress-basic plugin.`,
            );
          }

          contentType = {
            enum: inferredEnum,
            ...contentType,
            ...includedContentTypes[contentType.name],
          };

          await createPagesForContentNodes({
            contentType,
            query,
            nodesPerPage,
          })({ ...params, gql }, pluginOptions);
        }),
    );
  }
}
