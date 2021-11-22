import { Link } from "@whitespace/components";
import { memoize } from "lodash-es";
import PropTypes from "prop-types";
import React from "react";

import DeprecatedSearchHit from "../SearchHitContact";
import SearchTeaser from "../SearchTeaser";
import SearchTeaserContent from "../SearchTeaserContent";
import SearchTeaserMedia from "../SearchTeaserMedia";
import SearchTeaserMeta from "../SearchTeaserMeta";
import SearchTeaserTitle from "../SearchTeaserTitle";

ContactSearchHit.propTypes = {
  dateFormat: PropTypes.objectOf(PropTypes.string),
  hit: PropTypes.shape({
    city: PropTypes.node,
    email: PropTypes.string,
    image: PropTypes.object,
    name: PropTypes.node,
    phone: PropTypes.node,
    title: PropTypes.node,
  }),
};

const warnOnce = memoize((...args) => console.warn(...args));

export default function ContactSearchHit({ dateFormat, hit, ...restProps }) {
  if (DeprecatedSearchHit) {
    warnOnce(
      "It looks like you’ve shadowed @whitespace/gatsby-plugin-search/src/components/SearchHitContact. That file will be removed in v2.0 of @whitespace/gatsby-plugin-search. Please use @whitespace/gatsby-plugin-search/src/components/search-hits/ContactSearchHit instead",
    );
    return <DeprecatedSearchHit {...hit} />;
  }

  void dateFormat;

  const { city, email, image, name, phone, title } = hit;

  return (
    <SearchTeaser as="li" {...restProps}>
      {image && (
        <SearchTeaserMedia
          image={{
            ...image,
            aspectRatio: 1,
          }}
        />
      )}
      <SearchTeaserContent>
        <div>
          <SearchTeaserTitle>{name}</SearchTeaserTitle>
          {title && <p>{title}</p>}
        </div>
        <SearchTeaserMeta>
          {city && <p>{city}</p>}
          {phone && <p>{phone}</p>}
          {email && <Link href={`mailto:${email}`}>{email}</Link>}
        </SearchTeaserMeta>
      </SearchTeaserContent>
    </SearchTeaser>
  );
}
