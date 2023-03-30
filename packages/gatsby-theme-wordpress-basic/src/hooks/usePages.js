import { useStaticQuery, graphql } from "gatsby";

export default function usePages() {
  let data = useStaticQuery(graphql`
    query PageTree {
      graphQlQuery(name: { eq: "WPPaginatedNodesForPageTree" }) {
        data
      }
      wp {
        npRedirects(first: 10000) {
          nodes {
            id
            parentId
            title
            # isFrontPage
            uri
            menuOrder
            connectedNode {
              node {
                ... on WP_Page {
                  uri
                  ...WP_PageForMenuItem
                }
              }
            }
            # label
            # description
            # url
            # target
            ...WP_NpRedirectForPageTree
          }
        }
      }
    }
  `);

  let pages = data.graphQlQuery?.data?.pages?.nodes || [];
  pages.sort(
    (a, b) => a.menuOrder - b.menuOrder || a.databaseId - b.databaseId,
  );
  let npRedirects = (data.wp?.npRedirects?.nodes || []).map(
    ({ connectedNode, ...rest }) => ({
      ...rest,
      ...connectedNode?.node,
      showInMenu: true,
    }),
  );
  let items = [...pages, ...npRedirects];
  items.sort((a, b) => a.menuOrder - b.menuOrder);
  return items;
}
