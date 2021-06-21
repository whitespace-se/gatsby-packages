import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_ContentTypesForHook on WP {
    contentTypes {
      nodes {
        labels {
          menuName
          name
          singularName
        }
        name
        slug
        uri
      }
    }
  }
`;
