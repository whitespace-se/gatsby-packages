import { H } from "@jfrk/react-heading-levels";
import { Link } from "gatsby";
import Img from "gatsby-image";
import React from "react";

import * as styles from "./SearchHit.module.css";

export default function SearchHit({ label, text, url, path, image }) {
  return (
    <li className={styles.wrapper}>
      <div className="search-hit__content">
        <H className={styles.label}>
          {url ? <Link to={url}>{label}</Link> : label}
        </H>
        <p
          className="search-hit__excerpt"
          dangerouslySetInnerHTML={{ __html: text }}
        />
        {path && (
          <div className="search-hit__breadcrumbs">
            {path.map(({ url, label }, index) => (
              <Link
                key={index}
                to={url}
                dangerouslySetInnerHTML={{ __html: label }}
              />
            ))}
          </div>
        )}
      </div>
      {image && (
        <Img
          fluid={{
            ...image,
            aspectRatio: 155 / 80,
          }}
          className="search-hit__image"
        />
      )}
    </li>
  );
}
