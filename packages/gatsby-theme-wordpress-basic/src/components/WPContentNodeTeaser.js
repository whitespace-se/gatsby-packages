import { camelCase, upperFirst } from "lodash-es";
import PropTypes from "prop-types";
import React from "react";

import * as components from "./content-node-teasers";

function fromContentTypeToComponentName(contentType) {
  return contentType && `WP${upperFirst(camelCase(contentType))}Teaser`;
}

WPContentNodeTeaser.propTypes = {
  contentNode: PropTypes.shape({ contentType: PropTypes.string.isRequired }),
};

export default function WPContentNodeTeaser({ contentNode, ...restProps }) {
  let componentName = fromContentTypeToComponentName(contentNode.contentType);
  let Component =
    // eslint-disable-next-line import/namespace
    (componentName && components[componentName]) ||
    components.WPDefaultContentNodeTeaser;

  return (
    <Component
      contentNode={contentNode}
      componentName={componentName}
      {...restProps}
    />
  );
}
