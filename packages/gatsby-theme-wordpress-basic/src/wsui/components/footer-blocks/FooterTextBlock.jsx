/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { Heading, TypographyBlock, useThemeProps } from "@wsui/base";

import Html from "../Html.jsx";

export default function FooterTextBlock(props) {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  props = useThemeProps({ props, name: "FooterTextBlock" });
  props = useThemeProps({ props, name: "FooterBlock" });
  let {
    block,
    headingVariant = "h3",
    elementMapping = { p: "description" },
  } = props;
  let { title, content } = block;
  return (
    <div>
      <Heading variant={headingVariant} marginAfter>
        {title}
      </Heading>
      <TypographyBlock elementMapping={elementMapping}>
        <Html>{content}</Html>
      </TypographyBlock>
    </div>
  );
}
