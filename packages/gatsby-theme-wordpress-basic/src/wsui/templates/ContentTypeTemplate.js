/** @jsx jsx */
import { jsx } from "@emotion/react";
import { H, Section } from "@jfrk/react-heading-levels";
import { PageGrid, PageGridItem } from "@whitespace/components";
import PropTypes from "prop-types";
// import { useTranslation } from "react-i18next";

import ContentTypeArchive from "../../components/algolia/ContentTypeArchive";

ContentTypeTemplate.propTypes = {
  pageContext: PropTypes.shape({
    contentType: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

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
