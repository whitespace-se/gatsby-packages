import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import SearchHit from "./SearchHit";
import SearchHitContact from "./SearchHitContact";
import * as defaultStyles from "./SearchHits.module.css";

SearchHits.propTypes = {
  hits: PropTypes.array.isRequired,
};

export default function SearchHits({ styles = defaultStyles, hits }) {
  return (
    <ul className={styles.wrapper}>
      {hits.map((hit, index) => {
        const HitComponent =
          hit.contentType === "contact" ? SearchHitContact : SearchHit;
        return <HitComponent {...hit} key={index} />;
      })}
    </ul>
  );
}
