import { camelCase, upperFirst } from "lodash-es";
import PropTypes from "prop-types";
import React from "react";

import * as components from "./content-node-cards";

function fromContentTypeToComponentName(contentType) {
  return contentType && `WP${upperFirst(camelCase(contentType))}Card`;
}

WPContentNodeCard.propTypes = {
  contentNode: PropTypes.shape({ contentType: PropTypes.string.isRequired }),
};

export default function WPContentNodeCard({ contentNode, ...restProps }) {
  let componentName = fromContentTypeToComponentName(contentNode.contentType);
  let Component =
    // eslint-disable-next-line import/namespace
    (componentName && components[componentName]) ||
    components.WPDefaultContentNodeCard;

  return (
    <Component
      contentNode={contentNode}
      componentName={componentName}
      {...restProps}
    />
  );
}
