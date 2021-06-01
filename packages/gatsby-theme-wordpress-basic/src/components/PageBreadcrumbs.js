import { Breadcrumbs } from "@whitespace/components";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import usePages from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/pages";
import {
  getFrontPage,
  getAncestors,
  getPage,
} from "@whitespace/gatsby-theme-wordpress-basic/src/utils/pageTree";
import React from "react";

import { useContentTypes } from "../hooks";

export default function PageBreadcrumbs({
  items: customItems,
  hideRoot,
  hideCurrent,
  ...restProps
}) {
  const allPages = usePages();
  let items = [getFrontPage(allPages)];
  const contentTypes = useContentTypes();
  if (customItems) {
    items.push(...customItems);
  } else {
    const pageContext = usePageContext();
    const {
      contentNode: { contentType: { node: contentType } = {} } = {},
    } = pageContext;
    const pageContentTypeName = contentType?.name;
    switch (pageContentTypeName) {
      case "page":
        {
          const {
            contentNode: { id: pageId, isFrontPage },
          } = pageContext;
          if (!isFrontPage) {
            items.push(
              ...getAncestors(allPages, pageId),
              getPage(allPages, pageId),
            );
          }
        }
        break;
      default: {
        let postType = contentTypes.find(
          (contentType) => contentType.name === pageContentTypeName,
        );
        if (postType) {
          let { labels: { menuName: label } = {}, uri: url } = postType;
          items.push({ label, url });
        }
        items.push(pageContext.contentNode);
      }
    }

    if (hideRoot) {
      items.shift();
    }

    if (hideCurrent) {
      items.pop();
    }
  }
  if (!items || items.length === 0) {
    return null;
  }
  items = items.filter(Boolean).map(({ title, label, uri: url }) => ({
    label: label || title,
    url,
  }));
  return <Breadcrumbs hideDescription={true} items={items} {...restProps} />;
}
