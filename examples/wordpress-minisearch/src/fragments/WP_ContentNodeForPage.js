import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_ContentNodeForPage on WP_ContentNode {
    id
    databaseId
    uri
    dateGmt
    contentType {
      node {
        name
      }
    }
    ... on WP_NodeWithAuthor {
      author {
        node {
          name
        }
      }
    }
    ... on WP_NodeWithTitle {
      title
    }
    ... on WP_NodeWithContentEditor {
      content
      contentMedia {
        ...WP_ImageLarge
      }
    }
    # ... on WP_BlockEditorContentNode {
    #   ...WP_BlocksForPage
    # }
    ... on WP_Page {
      ...WP_PageForPage
    }
    ... on WP_Post {
      ...WP_PostForPage
    }
    ... on WP_NodeWithFeaturedImage {
      featuredImage {
        node {
          ...WP_ImageMedium
        }
      }
    }
    ... on WP_NodeWithPageAttributes {
      menuOrder
    }
  }
`;
