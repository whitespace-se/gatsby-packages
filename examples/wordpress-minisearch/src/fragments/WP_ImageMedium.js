import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_ImageMedium on WP_MediaItem {
    databaseId
    base64: base64Uri
    src: sourceUrl(size: MEDIUM)
    srcSet: srcSet(size: MEDIUM)
    srcWebp: sourceUrl(size: MEDIUM)
    srcSetWebp: srcSet(size: MEDIUM)
    width(size: MEDIUM)
    height(size: MEDIUM)
    alt: altText
    caption
  }
`;
