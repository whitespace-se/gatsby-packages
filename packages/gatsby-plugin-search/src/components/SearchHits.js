import PropTypes from "prop-types";
import React from "react";

import SearchHit from "./SearchHit";
import SearchHitContact from "./SearchHitContact";
import * as defaultStyles from "./SearchHits.module.css";

SearchHits.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  hits: PropTypes.array.isRequired,
};

const SearchHitComponent = (props) => {
  switch (props.contentType) {
    case "contact":
      return <SearchHitContact {...props} />;
    case "event":
      return <SearchHit showPublishDate={false} {...props} />;
    default:
      return <SearchHit {...props} />;
  }
};

export default function SearchHits({ styles = defaultStyles, hits }) {
  return (
    <ul className={styles.wrapper}>
      {hits.map((hit, index) => (
        <SearchHitComponent {...hit} key={index} />
      ))}
    </ul>
  );
}
