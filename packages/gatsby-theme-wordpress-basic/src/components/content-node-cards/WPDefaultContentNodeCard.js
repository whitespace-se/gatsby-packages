import { css } from "@emotion/react";
import {
  Card,
  CardContent,
  CardMedia,
  CardMeta,
  CardTitle,
} from "@whitespace/components";
import {
  TermList,
  Time,
} from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import clsx from "clsx";
import { kebabCase } from "lodash";
import PropTypes from "prop-types";
import React from "react";

import * as styles from "./ContentNodeCard.module.css";

WPDefaultContentNodeCard.propTypes = {
  // className: PropTypes.string,
  contentNode: PropTypes.shape({
    content: PropTypes.node,
    date: PropTypes.string,
    excerpt: PropTypes.node,
    image: PropTypes.object,
    theme: PropTypes.string,
    title: PropTypes.node,
    url: PropTypes.string,
    showAll: PropTypes.bool,
    taxonomies: PropTypes.arrayOf(PropTypes.object),
  }),
  dateFormat: PropTypes.objectOf(PropTypes.string),
  // styles: PropTypes.objectOf(PropTypes.string),
};

export default function WPDefaultContentNodeCard({
  contentNode,
  dateFormat = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  },
  ...restProps
}) {
  const { date, excerpt, image, showAll, title, url, theme, taxonomies } =
    contentNode;
  return (
    <Card
      link={{ url }}
      css={css({
        "--card-background": theme
          ? `var(--brand-color-${kebabCase(theme)})`
          : null,
        "--card-hover-background": theme
          ? `var(--brand-color-${kebabCase(theme)})`
          : null,
        "--card-color": theme
          ? `var(--brand-color-${kebabCase(theme)}-text)`
          : null,
        "--card-hover-color": theme
          ? `var(--brand-color-${kebabCase(theme)}-text)`
          : null,
        "--card-meta-color": theme
          ? `var(--brand-color-${kebabCase(theme)}-text)`
          : null,
      })}
      {...restProps}
    >
      <CardContent>
        <CardTitle>{title}</CardTitle>
        {date && (
          <CardMeta>
            <Time
              capitalize={true}
              className={clsx(styles.date)}
              date={date}
              format={dateFormat}
            />
          </CardMeta>
        )}
        {excerpt && (
          <p className={clsx(styles.excerpt, !showAll && styles.collapsed)}>
            {excerpt}
          </p>
        )}
        {taxonomies && taxonomies.length > 0 && (
          <TermList taxonomies={taxonomies} />
        )}
      </CardContent>
      {image && <CardMedia image={image} />}
    </Card>
  );
}
