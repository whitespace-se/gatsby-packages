/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Section } from "@jfrk/react-heading-levels";
import { SEO } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
// import ArticleTitle from "@whitespace/gatsby-theme-wordpress-basic/src/components/ArticleTitle";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks";

// import { Fragment } from "react";
import PageContent from "../../components/PageContent";
import PageContentAreaModules from "../../components/PageContentAreaModules";
import PageGrid from "../../components/PageGrid";
import PageGridItem from "../../components/PageGridItem";
import PageGridRow from "../../components/PageGridRow";
import PagePreamble from "../../components/PagePreamble";
import PageSliderAreaModules from "../../components/PageSliderAreaModules";

export default function FrontPageTemplate() {
  const { title } = usePageContext();

  return (
    <article
      css={css`
        margin-bottom: var(--spacing-xxl);
      `}
    >
      <SEO title={title} isFrontPage={true} />
      <Section>
        <PageSliderAreaModules
          defaultColspan={12}
          css={css`
            padding: 0 0;
            background-color: var(--color-primary-tint-4);
            margin: 0 auto;
            --page-grid-gap: 0;
          `}
        />
        <PageGrid
          css={css`
            padding: 0 var(--spacing-lg);
          `}
        >
          <PageGridItem>
            <PagePreamble
              css={css`
                text-align: center;
                margin-bottom: 2.5rem;
              `}
            />
            <PageContent />
          </PageGridItem>
        </PageGrid>
        <PageContentAreaModules
          defaultColspan={12}
          css={css`
            margin-top: var(--spacing-lg);
            margin-bottom: var(--spacing-lg);
            padding: 0 var(--spacing-lg);
          `}
        />
      </Section>
    </article>
  );
}
