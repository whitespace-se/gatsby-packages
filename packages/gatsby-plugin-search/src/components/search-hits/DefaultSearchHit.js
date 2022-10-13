import { Time } from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import { useContentType } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks";
import { memoize } from "lodash-es";
import PropTypes from "prop-types";
import React from "react";

import DeprecatedSearchHit from "../SearchHit";
import SearchTeaser from "../SearchTeaser";
import SearchTeaserContent from "../SearchTeaserContent";
import SearchTeaserExcerpt from "../SearchTeaserExcerpt";
import SearchTeaserMedia from "../SearchTeaserMedia";
import SearchTeaserMeta from "../SearchTeaserMeta";
import SearchTeaserTitle from "../SearchTeaserTitle";

DefaultSearchHit.propTypes = {
  dateFormat: PropTypes.objectOf(PropTypes.string),
  hit: PropTypes.shape({
    contentType: PropTypes.string,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    text: PropTypes.node,
    image: PropTypes.object,
    label: PropTypes.node,
    url: PropTypes.string,
    // taxonomies: PropTypes.arrayOf(PropTypes.object),
  }),
};

const warnOnce = memoize((...args) => console.warn(...args));

export default function DefaultSearchHit({
  dateFormat = {
    dateStyle: "short",
  },
  hit,
  ...restProps
}) {
  const contentType = useContentType(hit.contentType);

  if (DeprecatedSearchHit) {
    warnOnce(
      "It looks like you’ve shadowed @whitespace/gatsby-plugin-search/src/components/SearchHit. That file will be removed in v2.0 of @whitespace/gatsby-plugin-search. Please use files in @whitespace/gatsby-plugin-search/src/components/search-hits/ instead",
    );
    return <DeprecatedSearchHit {...hit} />;
  }

  const {
    date,
    text,
    image,
    label,
    url,
    // taxonomies,
  } = hit;

  return (
    <SearchTeaser as="li" {...restProps}>
      <SearchTeaserContent>
        <SearchTeaserTitle link={{ url }}>{label}</SearchTeaserTitle>
        {text && <SearchTeaserExcerpt>{text}</SearchTeaserExcerpt>}
        <SearchTeaserMeta>
          {contentType?.labels?.name && (
            <span>{contentType.labels.singularName}</span>
          )}
          {date && <Time date={date} format={dateFormat} />}
        </SearchTeaserMeta>
      </SearchTeaserContent>
      {image && (
        <SearchTeaserMedia
          image={{
            ...image,
            aspectRatio: 155 / 80,
          }}
        />
      )}
    </SearchTeaser>
  );
}
