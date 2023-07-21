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
// import { useTranslation } from "react-i18next";
import { Fragment } from "react";

import { usePageContext } from "../../hooks/page-context";
import SiteSearch from "../components/algolia/SiteSearch.jsx";
import Seo from "../components/Seo.jsx";

export default function SearchTemplate(props) {
  // eslint-disable-next-line no-unused-vars
  props = useThemeProps({ props, name: "SearchTemplate" });
  props = useThemeProps({ props, name: "Template" });
  let { defaultColspan = 7 } = props;
  const { title } = usePageContext();
  return (
    <Fragment>
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
    </Fragment>
  );
}
