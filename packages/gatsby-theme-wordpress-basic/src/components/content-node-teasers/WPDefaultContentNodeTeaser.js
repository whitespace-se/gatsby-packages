import {
  Teaser,
  TeaserContent,
  TeaserMedia,
  TeaserMeta,
  TeaserTitle,
} from "@whitespace/components";
import {
  TermList,
  Time,
} from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as styles from "./ContentNodeTeaser.module.css";

WPDefaultContentNodeTeaser.propTypes = {
  className: PropTypes.string,
  contentNode: PropTypes.shape({
    content: PropTypes.node,
    date: PropTypes.string,
    excerpt: PropTypes.node,
    image: PropTypes.object,
    theme: PropTypes.string,
    title: PropTypes.node,
    url: PropTypes.string,
    taxonomies: PropTypes.arrayOf(PropTypes.object),
  }),
  dateFormat: PropTypes.objectOf(PropTypes.string),
  // styles: PropTypes.objectOf(PropTypes.string),
};

export default function WPDefaultContentNodeTeaser({
  className,
  contentNode,
  dateFormat = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  },
  ...restProps
}) {
  const { date, excerpt, image, title, url, taxonomies } = contentNode;
  return (
    <Teaser
      className={clsx(className, styles.teaser)}
      link={{ url }}
      {...restProps}
    >
      <TeaserContent>
        <TeaserTitle>{title}</TeaserTitle>
        {date && (
          <TeaserMeta>
            <Time
              capitalize={true}
              className={clsx(styles.date)}
              date={date}
              format={dateFormat}
            />
          </TeaserMeta>
        )}
        {excerpt && <p className={clsx(styles.excerpt)}>{excerpt}</p>}
        {taxonomies && taxonomies.length > 0 && (
          <TermList taxonomies={taxonomies} />
        )}
      </TeaserContent>
      {image && <TeaserMedia image={image} />}
    </Teaser>
  );
}
