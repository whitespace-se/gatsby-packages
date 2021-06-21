import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_BlocksForPage on WP_BlockEditorContentNode {
    blocksJSON
    # blocks {
    #   ... on WP_CoreImageBlock {
    #     mediaItem {
    #       ...WP_ImageLarge
    #     }
    #   }
    # }
  }
`;
