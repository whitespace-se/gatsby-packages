import { Section } from "@jfrk/react-heading-levels";
import withComponentDefaults from "@whitespace/components/dist/withComponentDefaults";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import { layout } from "../foundation";
import { usePageContext, useIsFullWidthPage } from "../hooks";

import * as defaultStyles from "./Article.module.css";
import ArticleBody from "./ArticleBody";
import ArticleChildPageNav from "./ArticleChildPageNav";
import ArticleFeaturedImage from "./ArticleFeaturedImage";
import ArticleMeta from "./ArticleMeta";
import ArticlePublishDate from "./ArticlePublishDate";
import ArticleSiblingPageNav from "./ArticleSiblingPageNav";
import ArticleTagList from "./ArticleTagList";
import ArticleTitle from "./ArticleTitle";

Article.propTypes = {
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default withComponentDefaults(Article);

function Article({
  className,
  styles = defaultStyles,
  // displayMode,
  ...restProps
}) {
  let {
    contentNode: {
      isFrontPage,
      contentType: {
        node: { name: contentTypeName },
      },
    },
    // isPreview,
  } = usePageContext();

  let isFullWidthPage = useIsFullWidthPage();

  return (
    <article
      className={clsx(layout.component, layout.componentWidthFull, className)}
      {...restProps}
    >
      <ArticleFeaturedImage />
      <div
        className={clsx(
          layout.component,
          isFullWidthPage
            ? layout.componentWidthFull
            : layout.componentWidthNarrow,
        )}
      >
        <ArticleTitle />
        <Section>
          <ArticleChildPageNav className={styles.childPages} />
          {contentTypeName === "post" && (
            <ArticlePublishDate className={styles.publishedDate} />
          )}
          <ArticleBody />
          {!isFrontPage && (
            <footer className={styles.footer}>
              <ArticleMeta />
              <ArticleTagList taxonomy="tags" />
            </footer>
          )}
          {!isFrontPage && <ArticleSiblingPageNav />}
        </Section>
      </div>
    </article>
  );
}
