import { Link } from "@whitespace/components";
import hastToString from "hast-util-to-string";
import memoize from "lodash/memoize";
import React from "react";
import rehype2react from "rehype-react";
import unified from "unified";
import visit from "unist-util-visit";
import visitWithParents from "unist-util-visit-parents";

import { Image } from "../components";

export default function createHTMLProcessor({ rehypeParse: parse }) {
  function splitTree() {
    return function splitSubTree(nodes) {
      let tree = nodes[0];

      if (nodes.length === 1) {
        return [tree, tree];
      }

      let child = nodes[1];

      let [subtree1, subtree2] = splitSubTree(nodes.slice(1));

      return [
        {
          ...tree,
          children: [
            ...tree.children.slice(0, tree.children.indexOf(child)),
            subtree1,
          ],
        },
        {
          ...tree,
          children: [
            subtree2,
            ...tree.children.slice(tree.children.indexOf(child) + 1),
          ],
        },
      ];
    };
  }

  function createStringifier({ contentMedia = [] } = {}) {
    function WPImage({ attachment: attachmentId, ...restProps }) {
      let attachment = contentMedia.find(
        (attachment) => attachment.databaseId === Number(attachmentId),
      );
      if (!attachment) {
        return null;
      }
      let { src, srcSet, width, height, base64, aspectRatio, alt } = attachment;
      return (
        <Image
          src={src}
          srcSet={srcSet}
          width={width}
          height={height}
          base64={base64}
          aspectRatio={aspectRatio}
          alt={alt}
          {...restProps}
        />
      );
    }

    function WPCaption({ attachment: attachmentId, children, ...restProps }) {
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
          caption={
            React.Children.count(children) === 0
              ? processContent(caption)
              : children
          }
          credit={credit}
          {...restProps}
        />
      );
    }

    return unified().use(rehype2react, {
      createElement: React.createElement,
      Fragment: React.Fragment,
      components: {
        a: Link,
        "wp-caption": WPCaption,
        "wp-image": WPImage,
      },
    });
  }

  function isElementWithClassName(className) {
    return (node) =>
      node.type === "element" &&
      node.properties &&
      node.properties.className &&
      node.properties.className.includes(className);
  }

  const processContentTree = (options = {}) => (tree) => {
    if (!tree) {
      return tree;
    }

    if (options.contentMedia) {
      visit(tree, isElementWithClassName("wp-caption"), (node, index) => {
        node.tagName = "wp-caption";
        let [, attachment] = node.properties.id.match(/(\d+)/);
        node.properties = {
          attachment,
        };
        let newChildren = [];
        visit(node, isElementWithClassName("wp-caption-text"), (node) => {
          newChildren.push(...node.children);
        });
        node.children = newChildren;
        return [visit.SKIP, index + 1];
      });

      visit(tree, { tagName: "img" }, (node, index, parent) => {
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
              ...((parent.properties && parent.properties.className) || []),
              "paragraph",
            ],
          };
        }
      });
    }

    // let wpCaptionElements = selectAll(".wp-caption", tree);
    // wpCaptionElements.forEach((node) => {
    //   node.tagName = "wp-caption";
    // });

    const stringifier = createStringifier(options);
    return stringifier.stringify(tree);
  };

  const processContent = memoize((content, options) => {
    const tree = unified().use(parse, { fragment: true }).parse(content);
    return processContentTree(options)(tree);
  });

  const processPageContent = memoize((content, options) => {
    const tree = unified().use(parse, { fragment: true }).parse(content);

    let preambleTree = null,
      contentTree = tree;
    visitWithParents(
      tree,
      { type: "comment", value: "more" },
      (node, ancestors) => {
        [preambleTree, contentTree] = splitTree()([...ancestors, node]);
        return visitWithParents.EXIT;
      },
    );

    [preambleTree, contentTree] = [preambleTree, contentTree].map(
      processContentTree(options),
    );

    return {
      preamble: preambleTree,
      content: contentTree,
    };
  });

  const stripHTML = (string, allowedElements = []) => {
    if (allowedElements.length === 0 && typeof document !== "undefined") {
      const div = document.createElement("div");
      div.innerHTML = string;
      return div.textContent || div.innerText || "";
    }

    function convertToText(node) {
      switch (node.type) {
        case "text": {
          return [node];
        }
        case "element": {
          if (allowedElements.includes(node.tagName)) {
            return [
              { ...node, children: node.children.flatMap(convertToText) },
            ];
          }
          return node.children.flatMap(convertToText);
        }
        default:
          return [];
      }
    }

    const tree = unified().use(parse, { fragment: true }).parse(string);

    if (allowedElements.length === 0) {
      return hastToString(tree);
    }

    tree.children = tree.children.flatMap(convertToText);

    const stringifier = createStringifier();

    return stringifier.stringify(tree);
  };
  return { processContent, processPageContent, stripHTML };
}
