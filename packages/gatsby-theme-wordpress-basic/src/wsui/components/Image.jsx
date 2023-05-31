import { css } from "@emotion/react";
import { Link, TypographyBlock, useComponentWidth } from "@wsui/base";
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
  captionProps = {},
  credit,
  creditProps = {},
  estimatedWidth = 320,
  height,
  imgProps = {},
  linkProps = {},
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
      <Link to={linkTo} {...linkProps}>
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
          {...imgProps}
        />
      </Link>
      {!!(caption || credit) && (
        <figcaption
          css={css`
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            gap: 0.25rem 1rem;
          `}
          {...captionProps}
        >
          {caption}
          {!!credit && (
            // TODO: Translate
            <TypographyBlock>
              <p {...creditProps}>{"Fotograf: " + credit}</p>
            </TypographyBlock>
          )}
        </figcaption>
      )}
    </WrapperComponent>
  );
}
