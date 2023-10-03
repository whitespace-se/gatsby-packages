/** @jsx jsx */
import { css, jsx } from "@emotion/react";
import {
  Section,
  PageGrid,
  PageGridItem,
  useThemeProps,
  handleComponentsProp,
} from "@wsui/base";

import { usePageContext } from "../../hooks/page-context";
import {
  // PageChildNavigation,
  PageContent,
  // PageFeaturedImage,
  PageHeading,
  PagePreamble,
  // PageSiblingNavigation,
  PageFooter as DefaultPageFooter,
  Seo,
} from "../components";

export default function DefaultTemplate(props) {
  // eslint-disable-next-line no-unused-vars
  props = useThemeProps({ props, name: "DefaultTemplate" });
  props = useThemeProps({ props, name: "Template" });
  let { defaultColspan = 7, components } = props;
  components = handleComponentsProp(components, {
    PageFooter: DefaultPageFooter,
  });
  let { PageFooter } = components;
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
        <PageFooter />
      </Section>
    </article>
  );
}
