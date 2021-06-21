import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_PageForSearch on WP_Page {
    isFrontPage
    modifiedGmt
  }
`;
