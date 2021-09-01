import { useStaticQuery, graphql } from "gatsby";

export default function usePages() {
  return (
    useStaticQuery(graphql`
      query PageTree {
        graphQlQuery(name: { eq: "WPPaginatedNodesForPageTree" }) {
          data
        }
      }
    `).graphQlQuery?.data?.pages?.nodes || []
  );
}
