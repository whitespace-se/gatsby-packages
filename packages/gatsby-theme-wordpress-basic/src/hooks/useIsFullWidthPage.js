import { usePageContext } from "./page-context";

export default function useIsFullWidthPage() {

  let {
    contentNode: {
      isFrontPage,
      contentType: {
        node: { name: contentTypeName },
      },
    },
  } = usePageContext();


  const articleLayouts = ["page", "post"];


  return (isFrontPage || !articleLayouts.includes(contentTypeName));
}
