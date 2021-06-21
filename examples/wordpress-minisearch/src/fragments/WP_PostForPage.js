import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_PostForPage on WP_Post {
    modifiedGmt
  }
`;
