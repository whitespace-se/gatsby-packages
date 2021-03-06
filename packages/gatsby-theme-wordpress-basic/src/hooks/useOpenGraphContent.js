import { useHTMLProcessor } from "./html-processor";
import { usePageContext } from "./page-context";

export default function useOpenGraphContent(siteMeta, initialSeo) {
  const context = usePageContext();
  const contentNode = context?.contentNode;
  const contentType = contentNode?.contentType?.node?.name;

  let { openGraph, content, description, featuredImage, uri } =
    contentNode || {};

  const { processPageContent, stripHTML } = useHTMLProcessor();

  if (contentType) {
    const processedContent = processPageContent(content);

    if (!description) {
      if (processedContent.preamble) {
        description = processedContent.preamble;
      } else {
        description = stripHTML(content).slice(0, 300);
      }
    }

    return {
      metaTitle: openGraph?.title
        ? openGraph.title
        : initialSeo?.title
        ? initialSeo.title
        : siteMeta.title,
      metaDescription: openGraph?.description
        ? openGraph?.description
        : description
        ? description
        : siteMeta.description,
      metaImage: openGraph?.image
        ? openGraph.image
        : featuredImage?.node
        ? featuredImage?.node
        : null,
      metaUrl: siteMeta.siteUrl + uri,
    };
  }

  return {
    metaTitle: initialSeo.title ? initialSeo.title : siteMeta.title,
    metaDescription: initialSeo.description
      ? initialSeo.description
      : siteMeta.description,
    metaImage: null,
    metaUrl: siteMeta.siteUrl,
  };
}
