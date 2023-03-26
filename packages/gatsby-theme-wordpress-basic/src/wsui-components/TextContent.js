import { TypographyBlock } from "@wsui/base";
import React from "react";

export default function TextContent({ children, ...restProps }) {
  return <TypographyBlock {...restProps}>{children}</TypographyBlock>;
}
