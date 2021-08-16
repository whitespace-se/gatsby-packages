import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./SearchHitContact.module.css";

import {
  SearchTeaser,
  SearchTeaserContent,
  SearchTeaserMedia,
  SearchTeaserTitle,
  SearchTeaserMeta,
} from "./";

SearchHitContact.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  image: PropTypes.objectOf(PropTypes.string),
  name: PropTypes.string,
  title: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  phone: PropTypes.string,
  email: PropTypes.string,
  showImage: PropTypes.bool,
};

export default function SearchHitContact({
  className,
  styles = defaultStyles,
  name,
  title,
  city,
  phone,
  email,
  showImage = true,
  image,
  ...restProps
}) {
  return (
    <SearchTeaser
      as="address"
      className={clsx(
        className,
        styles.teaser,
        showImage && image && styles.teaserWImage,
      )}
    >
      {showImage && image && (
        <SearchTeaserMedia
          styles={styles}
          image={{
            ...image,
            aspectRatio: 1,
          }}
        />
      )}
      <SearchTeaserContent className={clsx(styles.teaserContent)}>
        <div className={styles.teaserHeader}>
          <SearchTeaserTitle styles={styles}>{name}</SearchTeaserTitle>
          {title && <p>{title}</p>}
        </div>
        <SearchTeaserMeta styles={styles}>
          {city && <p>{city}</p>}
          {phone && <p>{phone}</p>}
          {email && <a href={`mailto:${email}`}>{email}</a>}
        </SearchTeaserMeta>
      </SearchTeaserContent>
    </SearchTeaser>
  );
}
