import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_PostForSearch on WP_Post {
    categories {
      nodes {
        link
        name
        slug
        url: uri
        id
      }
    }
    tags {
      nodes {
        link
        name
        slug
        url: uri
        id
      }
    }
  }
`;
