import { graphql, useStaticQuery } from "gatsby";

export default function useContentTypes() {
  return (
    useStaticQuery(graphql`
      query WP_ContentTypes {
        wp {
          ...WP_ContentTypesForHook
        }
      }
    `)?.wp?.contentTypes?.nodes || []
  );
}
