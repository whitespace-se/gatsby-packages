import { useStaticQuery, graphql } from "gatsby";

/**
 * Fetches footer blocks via static query and returns them as an array of objects.
 */
export default function useFooterBlocks() {
  const data = useStaticQuery(graphql`
    query FooterBlocks {
      wp {
        acfOptionsFooter {
          footer {
            columns {
              colspan
              blocks {
                ... on WP_AcfOptionsFooterBlock {
                  blockType
                }
                ...WP_FooterBlock
              }
            }
          }
        }
      }
    }
  `);
  return data?.wp?.acfOptionsFooter?.footer?.columns || [];
}
