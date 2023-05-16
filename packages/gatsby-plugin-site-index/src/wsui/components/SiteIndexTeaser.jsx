/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Teaser, TeaserContent, TeaserTitle } from "@wsui/base";

export default function SiteIndexTeaser({ page, ...restProps }) {
  return (
    <Teaser link={{ to: page.path }} {...restProps}>
      <TeaserContent>
        <TeaserTitle>{page.context.title}</TeaserTitle>
      </TeaserContent>
    </Teaser>
  );
}
