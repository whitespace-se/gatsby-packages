import React from "react";

import SearchHit from "./SearchHit";
import * as styles from "./SearchHits.module.css";

export default function SearchHits({ hits }) {
  return (
    <ul className={styles.wrapper}>
      {hits.map((hit, index) => (
        <SearchHit {...hit} key={index} />
      ))}
    </ul>
  );
}
