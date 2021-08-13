import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./SearchHit.module.css";

import {
  SearchTeaser,
  SearchTeaserContent,
  SearchTeaserMedia,
  SearchTeaserTitle,
} from "./";

SearchHit.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  image: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])),
  label: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  text: PropTypes.string,
  url: PropTypes.string,
  showImage: PropTypes.bool,
  showExcerpt: PropTypes.bool,
};

export default function SearchHit({
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

