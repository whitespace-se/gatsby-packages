import { useStaticQuery, graphql } from "gatsby";

import { getPage } from "../utils/pageTree";

import usePages from "./pages";

function defaultTransform(data, { pages }) {
  return data.wp.menus.nodes.map((menu) => ({
    ...menu,
    items: menu.menuItems.nodes.map((menuItem) => {
      let { connectedObject, label, description, url, target, ...rest } =
        menuItem;
      let { contentType: { node: { name: type = "custom" } = {} } = {}, id } =
        connectedObject || {};
      let content = type === "page" ? getPage(pages, id) : {};
      return {
        type,
        url,
        target: connectedObject && connectedObject.id ? target : "_blank",
        ...content,
        label,
        description: description || (content && content.description),
        ...rest,
      };
    }),
  }));
}

export default function useMenus({ transform = defaultTransform }) {
  let pages = usePages();
  let data = useStaticQuery(graphql`
    query WP_Menus {
      wp {
        ...WP_MenusForHook
      }
    }
  `);
  return transform(data, { pages });
}

export function useMenu(location, { ...options }) {
  let menus = useMenus({ ...options });
  return menus.find((menu) => (menu.locations || []).includes(location));
}
