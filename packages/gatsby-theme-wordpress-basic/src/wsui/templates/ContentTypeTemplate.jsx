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

import ContentTypeArchive from "../components/algolia/ContentTypeArchive.jsx";
import Seo from "../components/Seo.jsx";

export default function ContentTypeTemplate(props) {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  props = useThemeProps({ props, name: "ContentTypeTemplate" });
  props = useThemeProps({ props, name: "Template" });
  let {
    defaultColspan = 7,
    pageContext: { title, contentType },
    footerMargin = null,
  } = props;
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
              <ContentTypeArchive contentType={contentType} />
            </Section>
          </PageGridItem>
        </PageGrid>
      </PageSection>
    </div>
  );
}
