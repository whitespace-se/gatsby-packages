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
              }
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
          contentType.enum = snakeCase(
            contentType.graphqlSingleName,
          ).toUpperCase();
          await createPagesForContentNodes({
            contentType,
            query,
          })({ ...params, gql }, pluginOptions);
        }),
    );
  }
}
