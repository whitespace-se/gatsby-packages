/** @jsx jsx */
import { jsx, css, useTheme } from "@emotion/react";
import {
  Link,
  TypographyBlock,
  parseStyle,
  useComponentWidth,
} from "@wsui/base";
import Img from "gatsby-image";

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
  imgProps: { style: imgStyle, ...imgRestProps } = {},
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
  hideCaption = false,
  ...restProps
}) {
  const theme = useTheme();
  let [componentWidth, ref] = useComponentWidth(estimatedWidth);

  if (WrapperComponent == null) {
    WrapperComponent = (caption || credit) && !hideCaption ? "figure" : "div";
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
            border-radius: ${theme.getLength(borderRadius)};
            ${parseStyle(imgStyle, theme)}
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
          {...imgRestProps}
        />
      </Link>
      {!!(caption || credit) && !hideCaption && (
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
