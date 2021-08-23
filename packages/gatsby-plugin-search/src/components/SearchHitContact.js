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
  city: PropTypes.node,
  className: PropTypes.string,
  email: PropTypes.string,
  image: PropTypes.objectOf(PropTypes.string),
  name: PropTypes.string,
  phone: PropTypes.string,
  showImage: PropTypes.bool,
  styles: PropTypes.objectOf(PropTypes.string),
  title: PropTypes.string,
};

export default function SearchHitContact({
  city,
  className,
  email,
  image,
  name,
  phone,
  showImage = true,
  styles = defaultStyles,
  title,
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
      {...restProps}
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
