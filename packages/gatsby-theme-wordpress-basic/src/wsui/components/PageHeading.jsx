/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import { H } from "@jfrk/react-heading-levels";

import { usePageContext } from "../../hooks/page-context";
import usePageContent from "../../hooks/usePageContent";

import TextContent from "./TextContent.jsx";

export default function PageHeading({ hideTitle = false, ...restProps }) {
  const theme = useTheme();
  const title = usePageContext()?.title;
  const { heading } = usePageContent();

  return (
    <TextContent
      css={() =>
        hideTitle && !heading ? theme.styleUtils.visuallyHidden : null
      }
      {...restProps}
    >
      {heading || <H>{title}</H>}
    </TextContent>
  );
}