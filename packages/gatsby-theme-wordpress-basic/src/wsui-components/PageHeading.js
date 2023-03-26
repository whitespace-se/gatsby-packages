import { H } from "@jfrk/react-heading-levels";
import React from "react";

import { usePageContext } from "../hooks";
import usePageContent from "../hooks/usePageContent";

import TextContent from "./TextContent";

export default function PageHeading({ ...restProps }) {
  const title = usePageContext()?.title;
  const { heading } = usePageContent();

  return <TextContent {...restProps}>{heading || <H>{title}</H>}</TextContent>;
}
