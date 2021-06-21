import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_ContentNodeForSearch on WP_ContentNode {
    id
    databaseId
    uri
    dateGmt
    contentType {
      node {
        name
      }
    }
    ... on WP_NodeWithTitle {
      title
    }
    ... on WP_NodeWithContentEditor {
      content
    }
    ... on WP_Page {
      ...WP_PageForSearch
    }
    ... on WP_Post {
      ...WP_PostForSearch
    }
    ... on WP_NodeWithFeaturedImage {
      featuredImage {
        node {
          ...WP_ImageMedium
        }
      }
    }
  }
`;
