import { useLocation } from "@gatsbyjs/reach-router";
import { useStaticQuery, graphql } from "gatsby";
import { startCase, camelCase } from "lodash";

export default function usePageBreadcrumbs({
  transformItems = (items) => items,
}) {
  const data = useStaticQuery(graphql`
    query PageBreadcrumbsQuery {
      allSitePage {
        nodes {
          path
          context {
            title
            ...SitePageContextForPageBreadcrumbs
          }
          ancestorPages {
            path
            context {
              title
              ...SitePageContextForPageBreadcrumbs
            }
          }
        }
      }
    }
  `);
  const location = useLocation();
  const page = data.allSitePage.nodes.find(
    (page) =>
      page.path.replace(/\/$/, "") === location.pathname.replace(/\/$/, ""),
  );
  let items;
  if (page) {
    const { ancestorPages, context, path } = page;
    items = [...ancestorPages, { context, path }].map((item) => {
      if (item) {
        let {
          context: { label, title },
          path,
        } = item;
        return {
          url: path,
          label: label || title || (path && startCase(camelCase(path))),
        };
      }
    });
  } else {
    items = [];
  }
  items = transformItems(items, { location, page });
  items = items.filter(Boolean);

  return { items };
}
