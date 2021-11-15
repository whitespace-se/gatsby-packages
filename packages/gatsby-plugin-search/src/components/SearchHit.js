import clsx from "clsx";
import { format, parseISO } from "date-fns";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./SearchHit.module.css";
import SearchTeaser from "./SearchTeaser";
import SearchTeaserContent from "./SearchTeaserContent";
import SearchTeaserMedia from "./SearchTeaserMedia";
import SearchTeaserTitle from "./SearchTeaserTitle";

SearchHit.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  image: PropTypes.objectOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ),
  label: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  text: PropTypes.string,
  publishDate: PropTypes.string,
  url: PropTypes.string,
  showImage: PropTypes.bool,
  showExcerpt: PropTypes.bool,
  showPublishDate: PropTypes.bool,
};

export default function SearchHit({
  className,
  styles = defaultStyles,
  label: title,
  showImage = true,
  showExcerpt = true,
  showPublishDate = true,
  text: excerpt,
  publishDate,
  url,
  image,
}) {
  return (
    <SearchTeaser as="li" className={clsx(className, styles.teaser)}>
      <SearchTeaserContent>
        <SearchTeaserTitle link={{ url }} styles={styles}>
          {title}
        </SearchTeaserTitle>
        {showPublishDate && publishDate && (
          <time
            className={clsx(styles.date)}
            dateTime={format(parseISO(publishDate), "yyyy-MM-dd")}
          >
            {format(parseISO(publishDate), "yyyy-MM-dd")}
          </time>
        )}
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
