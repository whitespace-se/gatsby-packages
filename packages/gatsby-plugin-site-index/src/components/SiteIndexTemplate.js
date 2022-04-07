/** @jsx jsx */
import { jsx } from "@emotion/react";
import { graphql } from "gatsby";
import PropTypes from "prop-types";
import { useMemo } from "react";

import useSiteIndexData from "../hooks/useSiteIndexData";

import SiteIndex from "./SiteIndex";

SiteIndexTemplate.propTypes = {
  data: PropTypes.shape({
    allSitePage: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          path: PropTypes.string.isRequired,
          context: PropTypes.shape({
            title: PropTypes.string.isRequired,
          }),
        }),
      ),
    }),
  }),
  pageContext: PropTypes.shape({
    initial: PropTypes.string.isRequired,
    initials: PropTypes.arrayOf(
      PropTypes.shape({
        initial: PropTypes.string.isRequired,
        path: PropTypes.string,
        label: PropTypes.string.isRequired,
      }),
    ),
    language: PropTypes.string.isRequired,
  }),
};

export default function SiteIndexTemplate({
  data,
  pageContext: { initial, initials, language },
  ...restProps
}) {
  const collator = useMemo(() => new Intl.Collator(language), [language]);

  let pages = data?.allSitePage?.nodes || [];
  pages.sort((a, b) => collator.compare(a.context.title, b.context.title));

  let { initial: currentChar, ...currentOption } = initials.find(
    (item) => item.initial === initial,
  );
  let { initialsWithPages } = useSiteIndexData();

  return (
    <SiteIndex
      currentChar={currentChar}
      {...currentOption}
      language={language}
      pages={pages}
      options={initials.map(({ initial, ...option }) => ({
        char: initial,
        ...option,
        hasPages: !!initialsWithPages[language]?.includes(initial),
      }))}
      {...restProps}
    />
  );
}

export const query = graphql`
  query SiteIndexTemplateQuery($initial: String!, $language: String!) {
    allSitePage(
      filter: {
        context: {
          siteIndexInitial: { eq: $initial }
          language: { eq: $language }
        }
      }
    ) {
      nodes {
        id
        path
        context {
          title
          siteIndexInitial
          language
        }
      }
    }
  }
`;
