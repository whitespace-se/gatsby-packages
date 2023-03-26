import React from "react";

import usePageContent from "../hooks/usePageContent";

import TextContent from "./TextContent.jsx";

export default function PagePreamble({ ...restProps }) {
  const { content } = usePageContent();

  if (!content) {
    return null;
  }

  return <TextContent {...restProps}>{content}</TextContent>;
}
