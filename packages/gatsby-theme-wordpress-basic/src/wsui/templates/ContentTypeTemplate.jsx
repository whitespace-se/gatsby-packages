/** @jsx jsx */
import { jsx } from "@emotion/react";
import {
  Section,
  PageGrid,
  PageGridItem,
  useThemeProps,
  PageSection,
  Heading,
} from "@wsui/base";
import { Fragment } from "react";

import ContentTypeArchive from "../components/algolia/ContentTypeArchive.jsx";
import Seo from "../components/Seo.jsx";

export default function ContentTypeTemplate(props) {
  // eslint-disable-next-line no-unused-vars
  props = useThemeProps({ props, name: "ContentTypeTemplate" });
  props = useThemeProps({ props, name: "Template" });
  let {
    defaultColspan = 7,
    pageContext: { title, contentType },
  } = props;
  return (
    <Fragment>
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
    </Fragment>
  );
}
