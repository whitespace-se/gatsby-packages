import { graphql } from "gatsby";

export const query = graphql`
  fragment ContactFileForSearch on File {
    id
    relativePath
    modifiedTime
    childContactsYaml {
      fullName
      position
      phone
      mail
    }
  }
`;
