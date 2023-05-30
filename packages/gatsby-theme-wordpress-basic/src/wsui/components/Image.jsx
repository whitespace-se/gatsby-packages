import { css } from "@emotion/react";
import { Link, useComponentWidth } from "@wsui/base";
import clsx from "clsx";
import Img from "gatsby-image";
import PropTypes from "prop-types";
import React from "react";

Image.propTypes = {
  alt: PropTypes.string,
  aspectRatio: PropTypes.number,
  base64: PropTypes.string,
  caption: PropTypes.node,
  captionProps: PropTypes.shape({ className: PropTypes.string }),
  className: PropTypes.string,
  // components: PropTypes.objectOf(PropTypes.elementType),
  credit: PropTypes.string,
  creditProps: PropTypes.shape({ className: PropTypes.string }),
  estimatedWidth: PropTypes.number,
  height: PropTypes.number,
  imgProps: PropTypes.shape({ className: PropTypes.string }),
  linkProps: PropTypes.shape({ className: PropTypes.string }),
  linkTo: PropTypes.any,
  maxWidth: PropTypes.number,
  src: PropTypes.string,
  srcSet: PropTypes.string,
  srcSetWebp: PropTypes.string,
  srcWebp: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
  width: PropTypes.number,
  WrapperComponent: PropTypes.elementType,
};

export default function Image({
  alt,
  aspectRatio,
  base64,
  caption,
  captionProps: { className: captionClassName, ...captionRestProps } = {},
  credit,
  creditProps: { className: creditClassName, ...creditRestProps } = {},
  estimatedWidth = 320,
  height,
  imgProps: { className: imgClassName, ...imgRestProps } = {},
  linkProps: { className: linkClassName, ...linkRestProps } = {},
  linkTo,
  maxWidth,
  src,
  srcSet,
  srcSetWebp,
  srcWebp,
  width,
  borderRadius,
  WrapperComponent = null,
  ...restProps
}) {
  let [componentWidth, ref] = useComponentWidth(estimatedWidth);

  if (WrapperComponent == null) {
    WrapperComponent = caption ? "figure" : "div";
  }
  return (
    <WrapperComponent
      css={css`
        margin: 0;
        max-width: ${maxWidth && `${maxWidth}px`};
      `}
      ref={ref}
      {...restProps}
    >
      <Link
        to={linkTo}
        // className={clsx(styles.link, linkClassName)}
        {...linkRestProps}
      >
        <Img
          css={css`
            border-radius: ${borderRadius};
          `}
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
          // className={clsx(styles.img, imgClassName)}
          {...imgRestProps}
        />
      </Link>
      {!!(caption || credit) && (
        <figcaption
          // className={clsx(styles.caption, captionClassName)}
          {...captionRestProps}
        >
          {caption}
          {!!credit && (
            // TODO: Translate
            <p
              // className={(styles.credit, creditClassName)}
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
