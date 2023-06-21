/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Section, PageGrid, PageGridItem, useThemeProps } from "@wsui/base";

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
  // eslint-disable-next-line no-unused-vars
  props = useThemeProps({ props, name: "DefaultTemplate" });
  let { defaultColspan = 7 } = props;
  const { title } = usePageContext();
  return (
    <article>
      <Seo title={title} />

      {/* Featured image */}
      {/* <PageFeaturedImage /> */}

      <PageGrid>
        <PageGridItem colspan={defaultColspan}>
          <PageHeading marginAfter />
          <Section>
            {/* <PageChildNavigation /> */}
            <PagePreamble marginAfter />
            <PageContent marginAfter />
          </Section>
        </PageGridItem>
      </PageGrid>
      <Section>
        {/* <footer className={styles.footer}>
          <PageMeta />
          <PageGrid>
            <PageGridItem>
              <PageSiblingNavigation />
            </PageGridItem>
          </PageGrid>
        </footer> */}
      </Section>
    </article>
  );
}
