import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./SearchHit.module.css";

import {
  SearchTeaser,
  SearchTeaserContent,
  SearchTeaserMedia,
  SearchTeaserTitle,
  SearchTeaserMeta,
} from "./";

SearchHit.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  image: PropTypes.objectOf([PropTypes.string, PropTypes.number]),
  label: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  text: PropTypes.string,
  url: PropTypes.string,
  showImage: PropTypes.bool,
  showExcerpt: PropTypes.bool,
};

export function SearchHit({
  className,
  styles = defaultStyles,
  label: title,
  showImage = true,
  showExcerpt = true,
  text: excerpt,
  url,
  image,
  ...restProps
}) {
  return (
    <SearchTeaser as="li" className={clsx(className, styles.teaser)}>
      <SearchTeaserContent>
        <SearchTeaserTitle link={{ url }} styles={styles}>
          {title}
        </SearchTeaserTitle>
        {showExcerpt && excerpt && (
          <p className={clsx(styles.excerpt)}>{excerpt}</p>
        )}
      </SearchTeaserContent>
      {showImage && image && (
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

SearchHitContact.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  image: PropTypes.objectOf([PropTypes.string, PropTypes.number]),
  name: PropTypes.string,
  title: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  phone: PropTypes.string,
  email: PropTypes.string,
  showImage: PropTypes.bool,
};

export function SearchHitContact({
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
        styles.teaserContact,
        showImage && image && styles.teaserContactWImage,
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
