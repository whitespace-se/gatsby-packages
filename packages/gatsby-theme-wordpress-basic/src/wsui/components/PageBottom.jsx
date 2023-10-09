/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import { MaybeFragment, useThemeProps } from "@wsui/base";

export default function PageBottom(props) {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  props = useThemeProps({ props, name: "PageBottom" });
  let { ownerState, ...restProps } = props;

  return <MaybeFragment {...restProps} />;
}
