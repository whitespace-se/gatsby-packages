import { camelCase, upperFirst } from "lodash-es";
import PropTypes from "prop-types";
import React from "react";

import * as hitComponents from "./search-hits";
import * as defaultStyles from "./SearchHits.module.css";

SearchHits.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  hits: PropTypes.array.isRequired,
};

function getComponentFromContentType(contentType) {
  let componentName =
    contentType && `${upperFirst(camelCase(contentType))}SearchHit`;
  return (
    // eslint-disable-next-line import/namespace
    (componentName && hitComponents[componentName]) ||
    hitComponents.DefaultSearchHit
  );
}

export default function SearchHits({ styles = defaultStyles, hits }) {
  return (
    <ul className={styles.wrapper}>
      {hits.map((hit, index) => {
        const Component = getComponentFromContentType(hit.contentType);
        return <Component hit={hit} key={index} />;
      })}
    </ul>
  );
}
