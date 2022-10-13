import { useTranslation } from "react-i18next";

import InternalLinkElement from "../components/InternalLinkElement";

import "./Grid.props.css";
import "./PageGrid.props.css";

export default {
  link: {
    components: {
      InternalLinkElement,
    },
  },
  pageBreadcrumbs: {
    transformItems: (items, { page }) => {
      const { t } = useTranslation();
      return page?.context?.isArchivePage
        ? items.slice(0, 2) // Remove the year and month parts of the archive page breadcrumbs
        : page?.context?.isSiteIndexPage
        ? items.map((item, index) =>
            index === 1
              ? { label: t(["siteIndex.pageTitle", "Content A to Z"]) }
              : item,
          ) // Add "Content" breadcrumb item for site index pages
        : items;
    },
  },
};
