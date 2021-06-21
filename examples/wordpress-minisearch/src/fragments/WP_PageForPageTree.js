import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_PageForPageTree on WP_Page {
    ... on WP_NodeWithFeaturedImage {
      featuredImage {
        node {
          ...WP_ImageMedium
        }
      }
    }
    template {
      templateName
    }
  }
`;
