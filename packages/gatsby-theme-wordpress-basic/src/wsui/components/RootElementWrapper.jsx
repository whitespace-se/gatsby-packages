import { useTheme, css } from "@emotion/react";
import { H, Link, UrlTransformerProvider } from "@wsui/base";
import React, { useContext } from "react";

import HtmlProcessorExtensionProvider from "../../components/HtmlProcessorExtensionProvider";
import htmlStringifierContext from "../../contexts/htmlStringifierContext";

import Image from "./Image.jsx";

export default function RootElementWrapper({ children }) {
  return (
    <HtmlProcessorExtensionProvider
      treeTransforms={[
        (tree, { visit, semanticHeadings, isHeadingElement, clsx }) => {
          if (semanticHeadings) {
            let baseHeadingLevel;
            visit(tree, isHeadingElement(), (node) => {
              let headingLevel = Number(node.tagName[1]);
              baseHeadingLevel = baseHeadingLevel || headingLevel;
              node.properties.className = clsx(
                node.properties.className,
                `wsui-h${headingLevel}`,
              );
              node.properties.adjustLevel = headingLevel - baseHeadingLevel;
              node.tagName = "heading";
            });
          }
        },
        (tree, { visit, contentMedia }) => {
          if (contentMedia) {
            visit(tree, { tagName: "img" }, (node) => {
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
              // if (parent.tagName === "p") {
              //   parent.tagName = "div";
              //   parent.properties = {
              //     ...parent.properties,
              //     className: [
              //       ...((parent.properties && parent.properties.className) ||
              //         []),
              //       "paragraph",
              //     ],
              //   };
              // }
            });
          }
        },
      ]}
      stringifierComponents={{
        a: Link,
        heading: H,
        "wp-caption": function WPCaption({
          attachment: attachmentId,
          width: imgWidth,
          children,
          ...restProps
        }) {
          const { contentMedia, processContent } = useContext(
            htmlStringifierContext,
          );
          let attachment = contentMedia.find(
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
              base64={base64}
              aspectRatio={aspectRatio}
              alt={alt}
              maxWidth={imgWidth}
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
          const theme = useTheme();
          const { contentMedia } = useContext(htmlStringifierContext);

          let attachment = contentMedia.find(
            (attachment) => attachment.databaseId === Number(attachmentId),
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
              borderRadius={theme.getLength(2.5)}
              base64={base64}
              aspectRatio={imgWidth / imgHeight || aspectRatio}
              alt={alt}
              maxWidth={imgWidth}
              {...restProps}
              css={css`
                margin-bottom: ${theme.getLength(8)};
                &.alignright {
                  width: 100%;
                  float: right;
                  margin-left: ${theme.getLength(8)};
                }
                &.alignleft {
                  width: 100%;
                  float: left;
                  margin-right: ${theme.getLength(8)};
                }
                &.aligncenter {
                  width: 100%;
                  margin-inline: auto;
                }
              `}
            />
          );
        },
      }}
    >
      <UrlTransformerProvider
        transformUrl={(url) => {
          url = url?.replace(/^http:/, "https:");
          url =
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
              : url?.replace(process.env.GATSBY_WORDPRESS_URL, "");
          return url;
        }}
      >
        {children}
      </UrlTransformerProvider>
    </HtmlProcessorExtensionProvider>
  );
}
