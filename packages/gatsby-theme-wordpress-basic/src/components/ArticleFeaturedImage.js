import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import { usePageContext, useHTMLProcessor } from "../hooks";

import * as defaultStyles from "./ArticleFeaturedImage.module.css";
import Image from "./Image";

ArticleFeaturedImage.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
};

export default function ArticleFeaturedImage({
  styles = defaultStyles,
  className,
  ...restProps
}) {
  let pageContext = usePageContext();
  let featuredImage = pageContext?.contentNode?.featuredImage;
  let postSingleShowFeaturedImage =
    pageContext?.displaySettings?.postSingleShowFeaturedImage ?? true;

  featuredImage = !!(
    featuredImage &&
    featuredImage.node &&
    postSingleShowFeaturedImage
  ) && {
    ...featuredImage.node,
    width: "1025",
    height: "288",
  };

  if (!featuredImage) {
    return null;
  }

  const { processContent } = useHTMLProcessor();
  let processedCaption = processContent(featuredImage.caption);

  return (
    <Image
      className={clsx(styles.component, className)}
      {...featuredImage}
      caption={processedCaption}
      {...restProps}
    />
  );
}
