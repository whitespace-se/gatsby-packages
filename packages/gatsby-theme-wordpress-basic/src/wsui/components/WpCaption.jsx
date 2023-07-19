/** @jsx jsx */
import { jsx, css, useTheme } from "@emotion/react";
import { useThemeProps } from "@wsui/base";
import { useContext, Children } from "react";

import htmlStringifierContext from "../../contexts/htmlStringifierContext";

import Image from "./Image.jsx";

export default function WpCaption(props) {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  props = useThemeProps({ props, name: "WpCaption" });
  let {
    attachment: attachmentId,
    width: imgWidth,
    children,
    borderRadius = 2.5,
    margin = 8,
    ...restProps
  } = props;
  const { contentMedia, processContent } = useContext(htmlStringifierContext);
  let attachment = contentMedia?.find(
    (attachment) => attachment.databaseId === Number(attachmentId),
  );
  if (!attachment) {
    return null;
  }
  let {
    src,
    srcSet,
    width,
    height,
    base64,
    aspectRatio,
    alt,
    caption,
    credit,
  } = attachment;
  return (
    <Image
      src={src}
      srcSet={srcSet}
      width={width}
      height={height}
      borderRadius={borderRadius}
      base64={base64}
      aspectRatio={aspectRatio}
      alt={alt}
      maxWidth={imgWidth}
      caption={
        Children.count(children) === 0 ? processContent(caption) : children
      }
      credit={credit}
      {...restProps}
      css={css`
        margin-bottom: ${theme.getLength(margin)};
        &.alignright {
          width: 100%;
          float: right;
          margin-left: ${theme.getLength(margin)};
        }
        &.alignleft {
          width: 100%;
          float: left;
          margin-right: ${theme.getLength(margin)};
        }
        &.aligncenter {
          width: 100%;
          margin-inline: auto;
        }
      `}
    />
  );
}
