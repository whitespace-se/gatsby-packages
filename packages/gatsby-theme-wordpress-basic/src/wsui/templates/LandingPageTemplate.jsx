/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Section } from "@jfrk/react-heading-levels";
import { PageGrid, PageGridItem, useThemeProps } from "@wsui/base";

import { usePageContext } from "../../hooks/page-context";
import { PageContent, PageHeading, PagePreamble, Seo } from "../components";

export default function LandingPageTemplate(props) {
  props = useThemeProps({ props, name: "LandingPageTemplate" });
  const { title } = usePageContext();
  return (
    <article css={css``}>
      <Seo title={title} />
      <PageGrid
        css={css`
          text-align: center;
          padding-block: 2rem;
        `}
      >
        <PageGridItem>
          <PageHeading css={css``} marginAfter />
          <Section>
            <PagePreamble css={css``} marginAfter />
            <PageContent />
          </Section>
        </PageGridItem>
      </PageGrid>
    </article>
  );
}