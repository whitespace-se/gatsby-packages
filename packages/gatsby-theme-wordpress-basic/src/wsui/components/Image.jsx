import { css } from "@emotion/react";
import { Link, TypographyBlock, useComponentWidth } from "@wsui/base";
import Img from "gatsby-image";
import React from "react";

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
