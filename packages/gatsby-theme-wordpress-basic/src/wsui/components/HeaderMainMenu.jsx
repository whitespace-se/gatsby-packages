/** @jsx jsx */
import { jsx, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  InlineList,
  Clickable,
  useThemeProps,
  handleComponentsProp,
} from "@wsui/base";

import { useMenu } from "../../hooks/menus.js";

const HeaderMainMenuRoot = styled("div")``;

const DefaultLink = styled(Clickable)`
  text-decoration: inherit;
  color: inherit;
  font-weight: 600;
  &.wsui-is-interactive:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`;

export default function HeaderMainMenu(props) {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  props = useThemeProps({ props, name: "HeaderMainMenu" });
  let { menu = "HEADER_TABS_MENU", components, ...restProps } = props;
  let { Link = DefaultLink } = handleComponentsProp(components, {
    Link: DefaultLink,
  });
  let { items } = useMenu(menu);

  if (!items?.length) return null;

  return (
    <HeaderMainMenuRoot {...restProps}>
      <InlineList overflow="hidden" spacing={[4, 8]}>
        {items.map(({ url, label, target }, index) => {
          return (
            <Link url={url} target={target} key={index}>
              {label}
            </Link>
          );
        })}
      </InlineList>
    </HeaderMainMenuRoot>
  );
}
