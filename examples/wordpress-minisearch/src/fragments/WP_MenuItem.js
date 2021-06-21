import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_MenuItem on WP_MenuItem {
    id
  }
`;
