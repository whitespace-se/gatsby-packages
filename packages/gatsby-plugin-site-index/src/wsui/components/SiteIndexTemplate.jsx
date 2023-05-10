/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks";
import {
  H,
  Section,
  PageGrid,
  PageGridItem,
  useThemeProps,
  Stack,
} from "@wsui/base";
import { graphql } from "gatsby";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

import useSiteIndexData from "../../hooks/useSiteIndexData";

import SiteIndexNav from "./SiteIndexNav.jsx";
import SiteIndexTeaser from "./SiteIndexTeaser.jsx";

export default function SiteIndexTemplate({ props }) {
  props = useThemeProps({ props, name: "SiteIndexTemplate" });
  let { data } = props;
  let { initial, initials, language } = usePageContext();
  const { t } = useTranslation();
  const collator = useMemo(() => new Intl.Collator(language), [language]);

  let pages = data?.allSitePage?.nodes || [];
  pages.sort((a, b) => collator.compare(a.context.title, b.context.title));

  let { initial: currentChar, label } = initials.find(
    (item) => item.initial === initial,
  );
  let { initialsWithPages } = useSiteIndexData();

  let options = initials.map(({ initial, ...option }) => ({
    char: initial,
    ...option,
    hasPages: !!initialsWithPages[language]?.includes(initial),
  }));

  return (
    <div>
      <PageGrid
        css={css`
          padding-block: 2rem;
        `}
      >
        <PageGridItem colspan={7}>
          <H>{t(["siteIndex.pageTitle", "Content A to Z"])}</H>
          <Section>
            <SiteIndexNav
              options={options}
              currentChar={currentChar}
              language={language}
            />
            <H>{label}</H>
            <Section>
              {pages?.length ? (
                <Stack>
                  {pages.map((page, index) => {
                    return <SiteIndexTeaser key={index} page={page} />;
                  })}
                </Stack>
              ) : (
                <p>{t(["siteIndex.emptyResult", "No pages"])}</p>
              )}
            </Section>
          </Section>
        </PageGridItem>
      </PageGrid>
    </div>
  );
}

export const query = graphql`
  query SiteIndexWsuiTemplateQuery($initial: String!, $language: String!) {
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
