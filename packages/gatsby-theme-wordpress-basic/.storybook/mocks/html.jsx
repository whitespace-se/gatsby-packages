import { Link } from "@wsui/base";
import hashSum from "hash-sum";
import { toString } from "hast-util-to-string";
import memoize from "lodash/memoize";
import PropTypes from "prop-types";
import React from "react";
import rehype2react from "rehype-react";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { visitParents } from "unist-util-visit-parents";

import { Image } from "@whitespace/gatsby-theme-wordpress-basic/src/wsui/components";

export default function createHTMLProcessor({
  rehypeParse: parse,
  inputTransforms = [],
  treeTransforms = [],
  stringifierComponents = {},
}) {
  function splitTree() {
    return function splitSubTree(nodes) {
      let tree = nodes[0];

      if (nodes.length === 1) {
        return [tree, tree];
      }

      let child = nodes[1];

      let [subtree1, subtree2] = splitSubTree(nodes.slice(1));

      let subTree = [
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

      return subTree;
    };
  }

  function createStringifier(options = {}) {
    let { contentMedia = [] } = options;
    WPImage.propTypes = {
      attachment: PropTypes.string,
      width: PropTypes.number,
      height: PropTypes.number,
    };
    function WPImage({
      attachment: attachmentId,
      width: imgWidth,
      height: imgHeight,
      ...restProps
    }) {
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
          aspectRatio={imgWidth / imgHeight || aspectRatio}
          alt={alt}
          maxWidth={imgWidth}
          {...restProps}
        />
      );
    }

    WPCaption.propTypes = {
      attachment: PropTypes.string,
      width: PropTypes.number,
      children: PropTypes.node,
    };
    function WPCaption({
      attachment: attachmentId,
      width: imgWidth,
      children,
      ...restProps
    }) {
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
    }

    let additionalComponents = {};

    Object.entries(stringifierComponents).forEach(([element, Component]) => {
      additionalComponents[element] = (props) => <Component {...props} />;
    });

    let components = {
      a: Link,
      "wp-caption": WPCaption,
      "wp-image": WPImage,
      ...additionalComponents,
    };

    return unified().use(rehype2react, {
      createElement: React.createElement,
      Fragment: React.Fragment,
      components,
    });
  }

  function isElementWithClassName(className) {
    return (node) =>
      node.type === "element" &&
      node.properties &&
      node.properties.className &&
      node.properties.className.includes(className);
  }

  const processContentTree =
    (options = {}) =>
    (tree) => {
      if (!tree) {
        return tree;
      }

      if (options.contentMedia) {
        visit(tree, isElementWithClassName("wp-caption"), (node, index) => {
          node.tagName = "wp-caption";
          let [, attachment] = node.properties.id.match(/(\d+)/);
          let [width] = node.properties.style.match(/\d+/g);
          node.properties = {
            attachment,
            width: parseInt(width),
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

      treeTransforms.forEach((transformer) =>
        transformer(tree, { ...options, visit }),
      );

      // let wpCaptionElements = selectAll(".wp-caption", tree);
      // wpCaptionElements.forEach((node) => {
      //   node.tagName = "wp-caption";
      // });

      const stringifier = createStringifier(options);
      return stringifier.stringify(tree);
    };

  const processContent = memoize(
    (content, options) => {
      content = inputTransforms.reduce(
        (content, transformer) => transformer(content, { ...options }),
        content,
      );
      const tree = unified().use(parse, { fragment: true }).parse(content);
      return processContentTree(options)(tree);
    },
    (content, options) => `${content}::${hashSum(options)}`,
  );

  const processPageContent = memoize(
    (content, options) => {
      content = inputTransforms.reduce(
        (content, transformer) => transformer(content, { ...options }),
        content,
      );
      const tree = unified().use(parse, { fragment: true }).parse(content);

      let preambleTree = null,
        contentTree = tree;
      visitParents(
        tree,
        { type: "comment", value: "more" },
        (node, ancestors) => {
          [preambleTree, contentTree] = splitTree()([...ancestors, node]);
          return visitParents.EXIT;
        },
      );

      [preambleTree, contentTree] = [preambleTree, contentTree].map(
        processContentTree(options),
      );

      return {
        preamble: preambleTree,
        content: contentTree,
      };
    },
    (content, options) => `${content}::${hashSum(options)}`,
  );

  const stripHTML = (string, allowedElements = []) => {
    // string = inputTransforms.reduce((string, transformer) =>
    //   transformer(string, {}),
    //  string);
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
      return toString(tree);
    }

    tree.children = tree.children.flatMap(convertToText);

    const stringifier = createStringifier();

    return stringifier.stringify(tree);
  };
  return { processContent, processPageContent, stripHTML };
}
