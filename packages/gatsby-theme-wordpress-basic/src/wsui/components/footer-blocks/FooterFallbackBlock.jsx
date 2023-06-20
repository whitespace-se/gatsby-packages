/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { DevNotice, useThemeProps } from "@wsui/base";

export default function FooterFallbackBlock(props) {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  props = useThemeProps({ props, name: "FooterFallbackBlock" });
  let { block } = props;
  return (
    <DevNotice>{`Unimplemented ${
      block?.blockType || "unknown"
    } block`}</DevNotice>
  );
}
