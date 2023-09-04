import usePageBreadcrumbs from "@whitespace/gatsby-plugin-breadcrumbs/src/usePageBreadcrumbs";
import {
  Breadcrumbs,
  PageGrid,
  PageGridItem,
  PageSection,
  useThemeProps,
} from "@wsui/base";
import React from "react";

export default function PageBreadcrumbs(props) {
  props = useThemeProps({ props, name: "PageBreadcrumbs" });
  let {
    transformItems = (items) => items,
    background = "transparent",
    spacingStart = [5, 10],
    ...restProps
  } = props;
  let { items } = usePageBreadcrumbs({ transformItems });
  if (!items || items.length < 2) return null;

  return (
    <PageSection background={background} spacingStart={spacingStart}>
      <PageGrid>
        <PageGridItem colspan={12}>
          <Breadcrumbs items={items} {...restProps} />
        </PageGridItem>
      </PageGrid>
    </PageSection>
  );
}
