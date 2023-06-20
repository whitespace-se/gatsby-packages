/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { Heading, TypographyBlock, useThemeProps } from "@wsui/base";

import Html from "../Html.jsx";

export default function FooterTextBlock(props) {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  props = useThemeProps({ props, name: "FooterTextBlock" });
  let { block } = props;
  let { title, content } = block;
  return (
    <div>
      <Heading variant="h3" marginAfter>
        {title}
      </Heading>
      <TypographyBlock>
        <Html>{content}</Html>
      </TypographyBlock>
    </div>
  );
}
