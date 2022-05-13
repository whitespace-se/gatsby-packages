import { usePageContext } from "./page-context";

export default function useIsFullWidthPage() {
  let pageContext = usePageContext();

  let isFrontPage = pageContext.contentNode?.isFrontPage;
  let contentType = pageContext.contentNode?.contentType?.node?.name;

  const articleLayouts = ["page", "post"];

  return isFrontPage || !articleLayouts.includes(contentType);
}
