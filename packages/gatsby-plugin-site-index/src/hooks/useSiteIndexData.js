import { useStaticQuery, graphql } from "gatsby";
import { countBy, mapValues, groupBy } from "lodash-es";
import { useMemo } from "react";

export default function useSiteIndexData() {
  let data = useStaticQuery(graphql`
    query SiteIndexDataQuery {
      allSitePage(
        filter: { context: { isIncludedInSiteIndex: { eq: true } } }
      ) {
        nodes {
          id
          context {
            title
            siteIndexInitial
            language
          }
        }
      }
    }
  `);
  let initialsWithPages = useMemo(() => {
    return mapValues(
      groupBy(data.allSitePage.nodes, "context.language"),
      (pages) => Object.keys(countBy(pages, "context.siteIndexInitial")),
    );
  }, [data]);
  return { initialsWithPages };
}
