import React from "react";
import { withReactHeadingLevels } from "./decorators/react-heading-levels";
import { SiteSearchProvider } from "./decorators/site-search-provider";
// import { withReactIDContext } from "./decorators/react-id";

import "../src";
import "./preview.css";

window.__PATH_PREFIX__ = ``;
window.__BASE_PATH__ = ``;

// Gatsby's Link overrides:
// Gatsby defines a global called ___loader to prevent its method calls from creating console errors you override it here
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
};
// Gatsby internal mocking to prevent unnecessary errors in storybook testing environment
global.__PATH_PREFIX__ = "";
// This is to utilized to override the window.___navigate method Gatsby defines and uses to report what path a Link would be taking us to if it wasn't inside a storybook
window.___navigate = (pathname) => {
  action("Navigate")(pathname);
};

export const decorators = [
  withReactHeadingLevels,
  (storyFn) => <SiteSearchProvider>{storyFn()}</SiteSearchProvider>,
];

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  // layout: "fullscreen",
  options: {
    storySort: (a, b) =>
      ((a[1].parameters && a[1].parameters.weight) || 0) ===
      ((b[1].parameters && b[1].parameters.weight) || 0)
        ? a[1].kind === b[1].kind
          ? 0
          : a[1].id.localeCompare(b[1].id, undefined, { numeric: true })
        : ((a[1].parameters && a[1].parameters.weight) || 0) -
          ((b[1].parameters && b[1].parameters.weight) || 0),
  },
};
