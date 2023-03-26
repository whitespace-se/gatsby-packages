/** @jsx jsx */
import { jsx } from "@emotion/react";

import usePageContent from "../hooks/usePageContent";

import TextContent from "./TextContent";

export default function PagePreamble({ ...restProps }) {
  const { preamble } = usePageContent();

  if (!preamble) {
    return null;
  }

  return (
    <TextContent elementMapping={{ p: "preamble" }} {...restProps}>
      {preamble}
    </TextContent>
  );
}
