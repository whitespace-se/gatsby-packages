import React from "react";

import usePageContent from "../../hooks/usePageContent";

import TextContent from "./TextContent.jsx";

export default function PageContent({ ...restProps }) {
  const { content } = usePageContent();

  if (!content) {
    return null;
  }

  return <TextContent {...restProps}>{content}</TextContent>;
}
