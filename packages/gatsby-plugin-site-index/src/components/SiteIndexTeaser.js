/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Teaser, TeaserContent, TeaserTitle } from "@whitespace/components";
import PropTypes from "prop-types";

SiteIndexTeaser.propTypes = {
  page: PropTypes.shape({
    path: PropTypes.string.isRequired,
    context: PropTypes.shape({
      title: PropTypes.node.isRequired,
    }),
  }),
};

export default function SiteIndexTeaser({ page, ...restProps }) {
  return (
    <Teaser link={{ to: page.path }} {...restProps}>
      <TeaserContent>
        <TeaserTitle>{page.context.title}</TeaserTitle>
      </TeaserContent>
    </Teaser>
  );
}
