import { useStaticQuery, graphql } from "gatsby";

export default function usePages() {
  let items =
    useStaticQuery(graphql`
      query PageTree {
        graphQlQuery(name: { eq: "WPPaginatedNodesForPageTree" }) {
          data
        }
      }
    `).graphQlQuery?.data?.pages?.nodes || [];
  items.sort((a, b) => a.menuOrder - b.menuOrder);
  return items;
}
