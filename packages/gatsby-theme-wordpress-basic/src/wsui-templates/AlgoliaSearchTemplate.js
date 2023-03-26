/** @jsx jsx */
import { jsx } from "@emotion/react";
import { H, Section } from "@jfrk/react-heading-levels";
import { PageGrid, PageGridItem } from "@whitespace/components";
import PropTypes from "prop-types";
// import { useTranslation } from "react-i18next";

import SiteSearch from "../components/algolia/SiteSearch";

SearchTemplate.propTypes = {
  pageContext: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default function SearchTemplate({ pageContext: { title } }) {
  // const { t } = useTranslation();
  return (
    <PageGrid>
      <PageGridItem>
        <H>{title}</H>
        <Section>
          <SiteSearch />
        </Section>
      </PageGridItem>
    </PageGrid>
  );
}
