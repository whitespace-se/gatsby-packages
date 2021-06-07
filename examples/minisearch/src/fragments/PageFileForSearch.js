import { graphql } from "gatsby";

export const query = graphql`
  fragment PageFileForSearch on File {
    id
    relativePath
    modifiedTime
    childMarkdownRemark {
      frontmatter {
        title
      }
      excerpt
      html
    }
  }
`;
