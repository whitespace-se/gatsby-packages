import { useStaticQuery, graphql } from "gatsby";

export default function useSiteMetadata() {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          author
          description
          siteUrl
          title
        }
      }
    }
  `);

  return site.siteMetadata;
}
