import { H } from "@jfrk/react-heading-levels";
import { Link } from "@whitespace/components";
import { useComponentContext } from "@whitespace/gatsby-plugin-search/src/contexts/componentContext";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

SearchTeaserTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  link: PropTypes.object,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function SearchTeaserTitle({
  children,
  className,
  link = {},
  styles,
  ...restProps
}) {
  let { styles: defaultStyles = {} } = useComponentContext("teaser");
  styles = styles ?? defaultStyles;
  return (
    <H className={clsx(styles.title, className)} {...restProps}>
      <Link className={styles.titleLink} {...link}>
        {children}
      </Link>
    </H>
  );
}
