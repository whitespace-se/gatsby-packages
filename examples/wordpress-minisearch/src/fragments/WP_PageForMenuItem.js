import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_PageForMenuItem on WP_Page {
    id
  }
`;
