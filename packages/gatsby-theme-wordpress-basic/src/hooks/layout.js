import { getPage } from "../utils/pageTree";

import usePages from "./pages";

export function useIsFullWidthPage(id, postType) {
  const isFrontPage = useIsFrontPage(id);

  const articleLayouts = ["page", "post"];

  const isFullWidthPage =
    (isFrontPage || !articleLayouts.includes(postType)) && true;

  return isFullWidthPage;
}

export function useIsFrontPage(id) {
  const allPages = usePages();

  const { isFrontPage } = getPage(allPages, id) || {};

  return isFrontPage;
}
