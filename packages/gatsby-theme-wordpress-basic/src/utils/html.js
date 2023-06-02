import hashSum from "hash-sum";
import { toString } from "hast-util-to-string";
import memoize from "lodash/memoize";
import React from "react";
import rehype2react from "rehype-react";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { visitParents } from "unist-util-visit-parents";

import htmlStringifierContext from "../contexts/htmlStringifierContext.js";

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
    let additionalComponents = {};

    Object.entries(stringifierComponents).forEach(([element, Component]) => {
      additionalComponents[element] = (props) => <Component {...props} />;
    });

    let components = {
      fragment: React.Fragment,
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
    // eslint-disable-next-line react/display-name
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
      }

      treeTransforms.forEach((transformer) =>
        transformer(tree, { ...options, visit }),
      );

      const stringifier = createStringifier(options);

      return (
        <htmlStringifierContext.Provider value={{ ...options, processContent }}>
          {stringifier.stringify(tree)}
        </htmlStringifierContext.Provider>
      );
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
    (content, options = {}) => {
      content = inputTransforms.reduce(
        (content, transformer) => transformer(content, { ...options }),
        content,
      );
      const tree = unified().use(parse, { fragment: true }).parse(content);

      let preambleTree = null,
        contentTree = tree,
        headingTree = null,
        headingContentTree = null;

      if (options.extractHeading) {
        if (tree?.children?.[0]?.tagName === "h1") {
          headingTree = tree.children.shift();
          headingContentTree = {
            type: "element",
            tagName: "fragment",
            children: headingTree.children,
          };
        }
      }

      if (!options.leavePreamble) {
        visitParents(
          tree,
          { type: "comment", value: "more" },
          (node, ancestors) => {
            [preambleTree, contentTree] = splitTree()([...ancestors, node]);
            return visitParents.EXIT;
          },
        );
      }

      [preambleTree, contentTree, headingTree, headingContentTree] = [
        preambleTree,
        contentTree,
        headingTree,
        headingContentTree,
      ].map(processContentTree(options));

      return {
        preamble: preambleTree,
        content: contentTree,
        heading: headingTree,
        headingContent: headingContentTree,
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
