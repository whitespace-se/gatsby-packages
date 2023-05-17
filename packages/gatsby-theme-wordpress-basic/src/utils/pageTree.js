export function getTopLevelPages(allPages) {
  return allPages.filter((page) => page.parentId == null && !page.isFrontPage);
}

export function getFrontPage(allPages) {
  return allPages.find((page) => page.isFrontPage);
}

export function getChildren(allPages, id) {
  return allPages.filter((page) => page.parentId === id);
}

export function getPage(allPages, id) {
  return allPages.find((page) => page.id === id);
}

export function getParentPage(allPages, id) {
  let page = getPage(allPages, id);
  return page && page.parentId && getPage(allPages, page.parentId);
}

export function getAncestors(allPages, id) {
  let ancestors = [];
  let parent = getParentPage(allPages, id);
  while (parent) {
    ancestors.push(parent);
    parent = getParentPage(allPages, parent.id);
  }
  ancestors.reverse();
  return ancestors;
}

export function getSiblings(allPages, id) {
  let page = getPage(allPages, id);
  if (!page || !page.parentId) {
    return [];
  }
  return allPages.filter(
    (siblingPage) =>
      siblingPage.parentId &&
      siblingPage.parentId === page.parentId &&
      siblingPage.id !== id,
  );
}

export function getPageThemeColor(allPages, id) {
  let page = getPage(allPages, id);
  while (page) {
    if (page.themeColor) {
      return page.themeColor;
    }
    page = getParentPage(allPages, page.id);
  }
  return "default";
}

export function getTreeStructure(
  allPages,
  parentId = null,
  {
    childrenProp = "children",
    transform = (page, children) => ({
      key: page.id,
      label: page.title,
      url: page.uri,
      ...page,
      [childrenProp]: children,
    }),
  } = {},
) {
  return (
    parentId == null
      ? getTopLevelPages(allPages)
      : getChildren(allPages, parentId)
  )
    .filter((page) => !!page.showInMenu && !page.isRestricted)
    .map((page) =>
      transform(
        page,
        getTreeStructure(allPages, page.id, { childrenProp, transform }),
      ),
    );
}
