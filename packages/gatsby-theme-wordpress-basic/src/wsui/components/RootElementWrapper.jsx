import { H, Link, UrlTransformerProvider } from "@wsui/base";
import React, { useContext } from "react";

import HtmlProcessorExtensionProvider from "../../components/HtmlProcessorExtensionProvider";

import WpCaption from "./WpCaption.jsx";
import WpImage from "./WpImage.jsx";
import AdminProvider from "./AdminProvider.jsx";
import pluginOptionsContext from "../../contexts/pluginOptionsContext.js";

export default function RootElementWrapper({ children }) {
  const { adminIframeUrl, dashboardUrl, editPostUrl } =
    useContext(pluginOptionsContext);
  return (
    <AdminProvider
      iframeUrl={adminIframeUrl}
      dashboardUrl={dashboardUrl}
      editPostUrl={editPostUrl}
    >
      <HtmlProcessorExtensionProvider
        treeTransforms={[
          (
            tree,
            {
              visit,
              semanticHeadings,
              ensureHeadingIds,
              isHeadingElement,
              clsx,
            },
          ) => {
            let baseHeadingLevel;
            let headingCount = 0;
            visit(tree, isHeadingElement(), (node) => {
              if (semanticHeadings) {
                let headingLevel = Number(node.tagName[1]);
                baseHeadingLevel = baseHeadingLevel || headingLevel;
                node.properties.className = clsx(
                  node.properties.className,
                  `wsui-h${headingLevel}`,
                );
                node.properties.adjustLevel = headingLevel - baseHeadingLevel;
                node.tagName = "heading";
              }
              if (ensureHeadingIds) {
                node.properties.id ??= `${
                  typeof ensureHeadingIds === "string"
                    ? ensureHeadingIds
                    : "heading"
                }-${headingCount++}`;
              }
            });
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
          "wp-caption": WpCaption,
          "wp-image": WpImage,
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
    </AdminProvider>
  );
}
