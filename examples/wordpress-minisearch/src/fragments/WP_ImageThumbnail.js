import { graphql } from "gatsby";

export const query = graphql`
  fragment WP_ImageThumbnail on WP_MediaItem {
    databaseId
    base64: base64Uri
    src: sourceUrl(size: THUMBNAIL)
    srcSet: srcSet(size: THUMBNAIL)
    srcWebp: sourceUrl(size: THUMBNAIL)
    srcSetWebp: srcSet(size: THUMBNAIL)
    width(size: THUMBNAIL)
    height(size: THUMBNAIL)
    alt: altText
    caption
  }
`;
