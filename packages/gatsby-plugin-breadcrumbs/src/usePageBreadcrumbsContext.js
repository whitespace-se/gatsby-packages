import { useContext } from "react";

import pageBreadcrumbsContext from "./pageBreadcrumbsContext";

export default function usePageBreadcrumbsContext() {
  return useContext(pageBreadcrumbsContext);
}
