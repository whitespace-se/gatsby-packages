import { useLocation } from "@gatsbyjs/reach-router";
import { Breadcrumbs, withComponentDefaults } from "@whitespace/components";
import { useStaticQuery, graphql } from "gatsby";
import { startCase, camelCase } from "lodash";
import PropTypes from "prop-types";
import React from "react";

PageBreadcrumbs.propTypes = {
  transformItems: PropTypes.func,
};

export default withComponentDefaults(PageBreadcrumbs, "pageBreadcrumbs");

function PageBreadcrumbs({ transformItems = (items) => items, ...restProps }) {
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
  return <Breadcrumbs hideDescription={true} items={items} {...restProps} />;
}
