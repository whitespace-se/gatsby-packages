/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Section } from "@jfrk/react-heading-levels";
import { PageGrid, PageGridItem, useThemeProps } from "@wsui/base";

import { usePageContext } from "../../hooks/page-context";
import {
  // PageChildNavigation,
  PageContent,
  // PageFeaturedImage,
  PageHeading,
  PagePreamble,
  // PageSiblingNavigation,
  Seo,
} from "../components";

export default function DefaultTemplate(props) {
  props = useThemeProps({ props, name: "DefaultTemplate" });
  const { title } = usePageContext();
  return (
    <article css={css``}>
      <Seo title={title} />

      {/* Featured image */}
      {/* <PageFeaturedImage /> */}

      <PageGrid
        css={css`
          padding-block: 2rem;
        `}
      >
        <PageGridItem colspan={7}>
          <PageHeading css={css``} marginAfter />
          <Section>
            {/* <PageChildNavigation /> */}
            <PagePreamble css={css``} marginAfter />
            <PageContent />
          </Section>
        </PageGridItem>
      </PageGrid>
      <Section>
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
