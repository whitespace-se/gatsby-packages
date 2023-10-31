/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import {
  Section,
  PageGrid,
  PageGridItem,
  useThemeProps,
  PageSection,
  Heading,
} from "@wsui/base";

import { usePageContext } from "../../hooks/page-context";
import SiteSearch from "../components/algolia/SiteSearch.jsx";
import Seo from "../components/Seo.jsx";

export default function SearchTemplate(props) {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  props = useThemeProps({ props, name: "SearchTemplate" });
  props = useThemeProps({ props, name: "Template" });
  let { defaultColspan = 7, footerMargin = null } = props;
  const { title } = usePageContext();
  return (
    <div
      css={css`
        padding-bottom: ${footerMargin && theme.getLength(footerMargin)};
      `}
    >
      <Seo title={title} />
      <PageSection background="transparent">
        <PageGrid>
          <PageGridItem colspan={defaultColspan}>
            <Heading marginAfter>{title}</Heading>
            <Section>
              <SiteSearch />
            </Section>
          </PageGridItem>
        </PageGrid>
      </PageSection>
    </div>
  );
}
