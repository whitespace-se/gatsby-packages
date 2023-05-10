/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Section, PageGrid, PageGridItem, useThemeProps } from "@wsui/base";

import { usePageContext } from "../../hooks/page-context";
import { PageContent, PageHeading, PagePreamble, Seo } from "../components";

export default function LandingPageTemplate(props) {
  // eslint-disable-next-line no-unused-vars
  props = useThemeProps({ props, name: "LandingPageTemplate" });
  const { title } = usePageContext();
  return (
    <article>
      <Seo title={title} />
      <PageGrid>
        <PageGridItem>
          <PageHeading marginAfter />
          <Section>
            <PagePreamble marginAfter />
            <PageContent />
          </Section>
        </PageGridItem>
      </PageGrid>
    </article>
  );
}
