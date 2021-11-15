import PropTypes from "prop-types";
import React from "react";

import SearchHit from "./SearchHit";
import SearchHitContact from "./SearchHitContact";
import * as defaultStyles from "./SearchHits.module.css";

SearchHits.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  hits: PropTypes.array.isRequired,
};

export default function SearchHits({ styles = defaultStyles, hits }) {
  return (
    <ul className={styles.wrapper}>
      {hits.map((hit, index) => {
        switch (hit.contentType) {
          case "contact":
            return <SearchHitContact {...hit} key={index} />;
          case "event":
            return <SearchHit showPublishDate={false} {...hit} key={index} />;
          default:
            return <SearchHit {...hit} key={index} />;
        }
      })}
    </ul>
  );
}
