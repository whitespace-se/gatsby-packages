/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  InlineList,
  Clickable,
  useThemeProps,
  handleComponentsProp,
  parseStyle,
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
  let { menu = "HEADER_TABS_MENU", components, style, ...restProps } = props;
  let { Link, List } = handleComponentsProp(components, {
    Link: DefaultLink,
    List: InlineList,
  });
  let items = useMenu(menu)?.items;

  if (!items?.length) return null;

  return (
    <HeaderMainMenuRoot
      css={css`
        ${parseStyle(style, theme)};
      `}
      {...restProps}
    >
      <List overflow="hidden" spacing={[4, 8]}>
        {items.map(({ url, label, target }, index) => {
          return (
            <Link url={url} target={target} key={index}>
              {label}
            </Link>
          );
        })}
      </List>
    </HeaderMainMenuRoot>
  );
}
