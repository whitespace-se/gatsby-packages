import { useStaticQuery, graphql } from "gatsby";

export default function usePages() {
  let data = useStaticQuery(graphql`
    query PageTree {
      graphQlQuery(name: { eq: "WPPaginatedNodesForPageTree" }) {
        data
      }
    }
  `);

  let pages = data.graphQlQuery?.data?.pages?.nodes || [];
  pages.sort(
    (a, b) => a.menuOrder - b.menuOrder || a.databaseId - b.databaseId,
  );
  return pages;
}
