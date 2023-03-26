/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Section } from "@jfrk/react-heading-levels";
import { PageGrid, PageGridItem, useThemeProps } from "@wsui/base";

import { usePageContext } from "../hooks/page-context";
import {
  // PageChildNavigation,
  PageContent,
  // PageContentAreaModules,
  // PageFeaturedImage,
  PageHeading,
  PagePreamble,
  // PageSiblingNavigation,
  Seo,
} from "../wsui-components";

export default function DefaultPageTemplate(props) {
  props = useThemeProps({ props, name: "DefaultPageTemplate" });
  const { title, isFrontPage } = usePageContext();
  return (
    <article css={css``}>
      <Seo title={title} isFrontPage={isFrontPage} />

      {/* Featured image */}
      {/* <PageFeaturedImage /> */}

      <PageGrid css={css``}>
        <PageGridItem colspan={8}>
          <PageHeading css={css``} marginAfter />
          <Section>
            {/* <PageChildNavigation /> */}
            <PagePreamble css={css``} marginAfter />
            <PageContent />
          </Section>
        </PageGridItem>
      </PageGrid>
      <Section>
        {/* <PageContentAreaModules defaultColspan={8} css={css``} /> */}
        {/* <footer className={styles.footer}>
          <PageMeta />
          <PageGrid css={css``}>
            <PageGridItem>
              <PageSiblingNavigation />
            </PageGridItem>
          </PageGrid>
        </footer> */}
      </Section>
    </article>
  );
}
