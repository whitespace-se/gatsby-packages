/** @jsx jsx */
import { jsx } from "@emotion/react";
import { H, Section } from "@jfrk/react-heading-levels";
import { PageGrid, PageGridItem } from "@wsui/base";
// import { useTranslation } from "react-i18next";

import SiteSearch from "../components/algolia/SiteSearch";

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
