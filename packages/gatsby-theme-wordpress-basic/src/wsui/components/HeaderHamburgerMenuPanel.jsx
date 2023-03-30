/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import { useLocation } from "@gatsbyjs/reach-router";
import { TreeMenu, Button } from "@wsui/base";

import usePageTree from "../../hooks/usePageTree";

export default function HeaderHamburgerMenuPanel({ ...restProps }) {
  const location = useLocation();
  const { pathname } = location;
  const items = usePageTree(
    {
      transform: ({ uri, ...item }, children) => ({
        ...item,
        href: uri,
        items: children,
        current: uri === pathname,
      }),
    },
    [pathname],
  );
  return <TreeMenu items={items || []} {...restProps} />;
}
