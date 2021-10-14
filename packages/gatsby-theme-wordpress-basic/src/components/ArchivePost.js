import { Link } from "@whitespace/components";
import PropTypes from "prop-types";
import React from "react";

import HTML from "./HTML";
import Image from "./Image";
import Time from "./Time";

ArchivePost.propTypes = {
  date: PropTypes.any,
  post: PropTypes.shape({
    categories: PropTypes.array,
    excerpt: PropTypes.string,
    featuredImage: PropTypes.shape({
      node: PropTypes.object,
    }),
    title: PropTypes.string,
    url: PropTypes.string,
  }),
};

const MAX_CATEGORY_COUNT = 2;

function normalizeCategories(categories) {
  return (Array.isArray(categories) ? categories : categories.nodes).map(
    (term) => (typeof term === "string" ? { name: term } : term),
  );
}

export default function ArchivePost({ post, date }) {
  const image = post.featuredImage?.node;
  let categories = post.categories && normalizeCategories(post.categories);
  return (
    <li className="c-archive__result">
      <Link className="c-archive__result-link" to={post.url}>
        {post.title}
      </Link>
      <div className="c-archive__result-divider">
        <div className="c-archive__result-content">
          <div className="c-archive__result-meta-data">
            {!!categories &&
              (categories.length ? (
                <>
                  {categories.slice(0, MAX_CATEGORY_COUNT).map(({ name }) => {
                    return (
                      <Link
                        key={name}
                        components={{ InertElement: "span" }}
                        className="c-archive__result-category"
                      >
                        {name}
                      </Link>
                    );
                  })}
                  {categories.length > MAX_CATEGORY_COUNT && (
                    <span className="c-archive__result-category">{`…`}</span>
                  )}
                </>
              ) : (
                <>
                  {/* <span className="c-archive__result-category">{`Ingen kategori`}</span> */}
                </>
              ))}
            <Time
              date={date}
              format={{
                year: "numeric",
                month: "numeric",
                day: "numeric",
              }}
            />
          </div>
          <div className="c-archive__result-excerpt">
            <HTML>{post.excerpt}</HTML>
          </div>
        </div>
        {image && (
          <Image
            src={image.src}
            srcSet={image.srcSet}
            width={image.width}
            height={image.height}
            base64={image.base64}
            aspectRatio={640 / 360}
            alt={image.altText}
            className="c-archive__result-image"
          />
        )}
      </div>
    </li>
  );
}
