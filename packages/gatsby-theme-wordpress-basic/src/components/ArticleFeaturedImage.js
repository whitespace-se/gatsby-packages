import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import { usePageContext } from "../hooks";

// import * as defaultStyles from "./ArticleFeaturedImage.module.css";
import Image from "./Image";

ArticleFeaturedImage.propTypes = {};

export default function ArticleFeaturedImage({
  // styles = defaultStyles,
  styles = {},
  ...restProps
}) {
  let {
    contentNode: { featuredImage },
    // isPreview,
  } = usePageContext();

  featuredImage = !!(featuredImage && featuredImage.node) && {
    ...featuredImage.node,
    width: "1025",
    height: "288",
  };

  if (!featuredImage) {
    return null;
  }
  return (
    <Image
      className={clsx(styles.featuredImage)}
      {...featuredImage}
      {...restProps}
    />
  );
}
