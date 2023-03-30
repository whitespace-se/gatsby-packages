import { useMemo } from "react";

import { getTreeStructure } from "../utils/pageTree";

import usePages from "./usePages";

export default function usePageTree(
  {
    root,
    childrenProp = "items",
    transform = (page, children) => ({ ...page, [childrenProp]: children }),
  } = {},
  deps,
) {
  const allPages = usePages();
  return useMemo(
    () => getTreeStructure(allPages, root, { childrenProp, transform }),
    [root, ...deps],
  );
}
