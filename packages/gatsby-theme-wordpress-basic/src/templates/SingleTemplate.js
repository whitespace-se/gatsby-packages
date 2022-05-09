import React from "react";

import { Article, SEO } from "../components";
import { usePageContext } from "../hooks";

export default function SingleTemplate() {
  const {
    contentNode: { title, isFrontPage },
  } = usePageContext();
  return (
    <>
      <SEO title={title} isFrontPage={isFrontPage} />
      <Article
      // displayMode="full"
      />
    </>
  );
}
