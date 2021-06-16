import { css } from "@emotion/react";
import { Link } from "@whitespace/components";
import { useComponentSize } from "@whitespace/gatsby-hooks";
import clsx from "clsx";
import Img from "gatsby-image";
import React, { useRef } from "react";

import * as defaultStyles from "./Image.module.css";

export default function Image({
  styles = defaultStyles,
  WrapperComponent = null,
  src,
  srcSet,
  srcWebp,
  srcSetWebp,
  width,
  height,
  base64,
  aspectRatio,
  alt,
  caption,
  credit,
  linkTo,
  estimatedWidth = 320,
  captionProps: { className: captionClassName, ...captionRestProps } = {},
  creditProps: { className: creditClassName, ...creditRestProps } = {},
  imgProps: { className: imgClassName, ...imgRestProps } = {},
  linkProps: { className: linkClassName, ...linkRestProps } = {},
  className,
  maxWidth,
  ...restProps
}) {
  let ref = useRef(null);

  let { width: componentWidth } = useComponentSize(ref, {
    width: estimatedWidth,
    height: (estimatedWidth / 16) * 9,
  });

  if (WrapperComponent == null) {
    WrapperComponent = caption ? "figure" : "div";
  }

  return (
    <WrapperComponent
      css={css({ "--image-max-width": maxWidth && `${maxWidth}px` })}
      className={clsx(styles.component, className)}
      ref={ref}
      {...restProps}
    >
      <Link
        to={linkTo}
        className={clsx(styles.link, linkClassName)}
        {...linkRestProps}
      >
        <Img
          fluid={{
            src,
            srcSet,
            srcWebp,
            srcSetWebp,
            sizes: `${componentWidth}px`,
            aspectRatio: aspectRatio || width / height,
            width,
            height,
            base64,
            alt,
          }}
          alt={alt}
          className={clsx(styles.img, imgClassName)}
          {...imgRestProps}
        />
      </Link>
      {!!(caption || credit) && (
        <figcaption
          className={clsx(styles.caption, captionClassName)}
          {...captionRestProps}
        >
          {caption}
          {!!credit && (
            // TODO: Translate
            <p
              className={(styles.credit, creditClassName)}
              {...creditRestProps}
            >
              {"Fotograf: " + credit}
            </p>
          )}
        </figcaption>
      )}
    </WrapperComponent>
  );
}
