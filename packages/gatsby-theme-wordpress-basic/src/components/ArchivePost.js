import {
  Link,
  Time,
} from "@whitespace/gatsby-theme-wordpress-basic/src/components";
import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import React from "react";

import Image from "./Image";

const MAX_CATEGORY_COUNT = 2;

function normalizeCategories(categories) {
  return (Array.isArray(categories) ? categories : categories.nodes).map(
    (term) => (typeof term === "string" ? { name: term } : term),
  );
}

export default function ArchivePost({ post, date }) {
  const { processContent } = useHTMLProcessor();
  const {
    featuredImage: { node: image },
  } = post;
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
            {processContent(post.excerpt)}
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
