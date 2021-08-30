import { collectFragments } from "gatsby-plugin-fragments/node";
import { snakeCase } from "lodash";

import createPagesForContentNodes from "./src/createPages";

if (
  new Intl.DateTimeFormat("es", { month: "long" }).format(new Date(9e8)) !==
  "enero"
) {
  console.warn(
    `ICU data is not loaded. NODE_ICU_DATA="${process.env.NODE_ICU_DATA}"`,
  );
}

export async function createPages(params, pluginOptions) {
  const { graphql, reporter } = params;
  const {
    wp: { contentTypes: includedContentTypes = { post: {}, page: {} } } = {},
  } = pluginOptions;
  const { gql } = await collectFragments(pluginOptions);
  reporter.info(`GATSBY_WORDPRESS_URL: ${process.env.GATSBY_WORDPRESS_URL}`);
  if (process.env.GATSBY_WORDPRESS_URL) {
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
          })({ ...params, gql }, pluginOptions);
        }),
    );
  }
}
