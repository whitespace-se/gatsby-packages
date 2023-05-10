/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import { Section, PageGrid, PageGridItem, useThemeProps } from "@wsui/base";

import { usePageContext } from "../../hooks/page-context";
import { PageContent, PageHeading, PagePreamble, Seo } from "../components";

export default function FrontPageTemplate(props) {
  // eslint-disable-next-line no-unused-vars
  props = useThemeProps({ props, name: "FrontPageTemplate" });
  const { title } = usePageContext();
  return (
    <article>
      <Seo title={title} isFrontPage />
      <PageGrid>
        <PageGridItem>
          <PageHeading hideTitle marginAfter />
          <Section>
            <PagePreamble marginAfter />
            <PageContent marginAfter />
          </Section>
        </PageGridItem>
      </PageGrid>
    </article>
  );
}
