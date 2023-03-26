/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Section } from "@jfrk/react-heading-levels";
import { SEO } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks";
import { useMenu } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/menus";
import usePages from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/pages";
import { getChildren } from "@whitespace/gatsby-theme-wordpress-basic/src/utils/pageTree";

import LandingPageHero from "../../../components/LandingPageHero";
import PageContent from "../components/PageContent";
import PageContentAreaModules from "../components/PageContentAreaModules";
import PageFeaturedImage from "../components/PageFeaturedImage";
import PageGrid from "../components/PageGrid";
import PageGridItem from "../components/PageGridItem";
import PageGridRow from "../components/PageGridRow";
import PagePreamble from "../components/PagePreamble";
import PageSliderAreaModules from "../components/PageSliderAreaModules";

export default function LandingPageTemplate() {
  const { title, isFrontPage } = usePageContext();

  const {
    contentNode: { id: pageId, databaseId },
  } = usePageContext();

  const allPages = usePages();
  const childPages = getChildren(allPages, pageId)
    .filter((page) => page.showInMenu)
    .map((page) => ({
      ...page,
      preamble: page?.menu?.menuDescription,
      items: getChildren(allPages, page.id)
        .filter((page) => page.showInMenu)
        .map((page) => ({
          ...page,
        })),
    }));

  const menu = useMenu("SHORTCUTS");
  const shortcuts = menu?.items;
  const shortcutMenuItem = shortcuts?.find(
    (item) => item.databaseId === databaseId,
  );
  return (
    <article
      css={css`
        margin-bottom: var(--spacing-xxl);
      `}
    >
      <SEO title={title} isFrontPage={isFrontPage} />
      {/* {!isFrontPage && <PageBreadcrumbs />} */}
      {/* <PageGrid
        css={css`
          padding: 0 var(--spacing-lg);
        `}
      >
        <PageGridRow>
          <PageGridItem colspan="12">
          </PageGridItem>
        </PageGridRow>
      </PageGrid> */}
      <LandingPageHero
        title={title}
        childPages={childPages}
        shortcutMenuItem={shortcutMenuItem}
      />

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
        {/* <PageGrid
          css={css`
            padding: 0 var(--spacing-lg);
          `}
        >
          <PageGridItem>
            <PagePreamble
              css={css`
                margin-bottom: 2.5rem;
              `}
            />
            <PageContent />
          </PageGridItem>
        </PageGrid> */}
        <PageContentAreaModules
          defaultColspan={12}
          css={css`
            padding: 0 var(--spacing-lg);
            margin-top: var(--spacing-xxl);
          `}
        />
      </Section>
    </article>
  );
}
