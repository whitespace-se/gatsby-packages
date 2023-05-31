/** @jsx jsx */
import { jsx } from "@emotion/react";
import { H, Section } from "@jfrk/react-heading-levels";
import { PageGrid, PageGridItem } from "@wsui/base";
// import { useTranslation } from "react-i18next";

import ContentTypeArchive from "../../components/algolia/ContentTypeArchive";

export default function ContentTypeTemplate({
  pageContext: { title, contentType },
}) {
  // const { t } = useTranslation();
  return (
    <PageGrid>
      <PageGridItem>
        <H>{title}</H>
        <Section>
          <ContentTypeArchive contentType={contentType} />
        </Section>
      </PageGridItem>
    </PageGrid>
  );
}
