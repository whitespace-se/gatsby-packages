import { getChildren, getSiblings } from "../utils/pageTree";

import usePages from "./usePages";

export function usePageChildren(pageId) {
  const allPages = usePages();

  const childPages = getChildren(allPages, pageId).map((page) => ({
    ...page,
    preamble: page.description,
    items: getChildren(allPages, page.id).map((page) => ({
      ...page,
    })),
  }));

  return childPages;
}

export function usePageSiblings(pageId) {
  const allPages = usePages();

  return getSiblings(allPages, pageId);
}
