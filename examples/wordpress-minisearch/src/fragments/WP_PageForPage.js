import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_PageForPage on WP_Page {
    isFrontPage
    modifiedGmt
  }
`;
