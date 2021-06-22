import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import SearchHit from "./SearchHit";
import * as defaultStyles from "./SearchHits.module.css";

SearchHits.propTypes = {
  hits: PropTypes.array.isRequired,
};

export default function SearchHits({ styles = defaultStyles, hits }) {
  return (
    <ul className={styles.wrapper}>
      {hits.map((hit, index) => (
        <SearchHit {...hit} key={index} />
      ))}
    </ul>
  );
}
