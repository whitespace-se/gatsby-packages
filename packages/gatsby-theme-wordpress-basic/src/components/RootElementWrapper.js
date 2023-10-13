import {
  Link,
  IconProvider,
  ThemeProvider,
  URLTransformerProvider,
} from "@whitespace/components";
import React, { useContext } from "react";

import htmlStringifierContext from "../contexts/htmlStringifierContext";
import theme from "../theme";

import HtmlProcessorExtensionProvider from "./HtmlProcessorExtensionProvider";
import Image from "./Image";
import { css } from "@emotion/react";

export default function RootElementWrapper({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <IconProvider getIconSrc={(name) => `/icons/${name}.svg`}>
        <URLTransformerProvider
          transformURL={(url) =>
            process.env.GATSBY_WORDPRESS_UPLOADS_URL &&
            url?.startsWith(
              process.env.GATSBY_WORDPRESS_URL + "/wp-content/uploads/",
            )
              ? url.replace(
                  process.env.GATSBY_WORDPRESS_URL + "/wp-content/uploads",
                  process.env.GATSBY_WORDPRESS_UPLOADS_URL,
                )
              : url?.startsWith(process.env.GATSBY_WORDPRESS_URL + "/wp-")
              ? url
              : url?.replace(process.env.GATSBY_WORDPRESS_URL, "")
          }
        >
          <HtmlProcessorExtensionProvider
            treeTransforms={[
              (tree, { visit, contentMedia }) => {
                if (contentMedia) {
                  visit(tree, { tagName: "img" }, (node, _, parent) => {
                    let attachmentId;
                    if (node.properties && node.properties.className) {
                      node.properties.className.some((className) => {
                        let matches = className.match(/^wp-image-(\d+)$/);
                        if (matches) {
                          attachmentId = matches[1];
                          return true;
                        }
                      });
                    }
                    if (!attachmentId) {
                      return;
                    }
                    node.tagName = "wp-image";
                    node.properties = {
                      ...node.properties,
                      attachment: attachmentId,
                      sizes: null,
                    };
                    if (parent.tagName === "p") {
                      parent.tagName = "div";
                      parent.properties = {
                        ...parent.properties,
                        className: [
                          ...((parent.properties &&
                            parent.properties.className) ||
                            []),
                          "paragraph",
                        ],
                      };
                    }
                  });
                }
              },
            ]}
            stringifierComponents={{
              a: Link,
              "wp-caption": function WPCaption({
                attachment: attachmentId,
                width: imgWidth,
                children,
                ...restProps
              }) {
                const { contentMedia, processContent } = useContext(
                  htmlStringifierContext,
                );
                let attachment = contentMedia?.find(
                  (attachment) =>
                    attachment.databaseId === Number(attachmentId),
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
                    base64={base64}
                    aspectRatio={aspectRatio}
                    alt={alt}
                    maxWidth={imgWidth}
                    css={css`width: 100%`}
                    caption={
                      React.Children.count(children) === 0
                        ? processContent(caption)
                        : children
                    }
                    credit={credit}
                    {...restProps}
                  />
                );
              },
              "wp-image": function WPImage({
                attachment: attachmentId,
                width: imgWidth,
                height: imgHeight,
                ...restProps
              }) {
                const { contentMedia } = useContext(htmlStringifierContext);
                let attachment = contentMedia?.find(
                  (attachment) =>
                    attachment.databaseId === Number(attachmentId),
                );
                if (!attachment) {
                  return null;
                }
                let { src, srcSet, width, height, base64, aspectRatio, alt } =
                  attachment;
                return (
                  <Image
                    src={src}
                    srcSet={srcSet}
                    width={width}
                    height={height}
                    base64={base64}
                    aspectRatio={imgWidth / imgHeight || aspectRatio}
                    alt={alt}
                    maxWidth={imgWidth}
                    css={css`width: 100%`}
                    {...restProps}
                  />
                );
              },
            }}
          >
            {children}
          </HtmlProcessorExtensionProvider>
        </URLTransformerProvider>
      </IconProvider>
    </ThemeProvider>
  );
}
