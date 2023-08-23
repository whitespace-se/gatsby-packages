/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Clickable,
  Heading,
  useThemeProps,
  handleComponentsProp,
  Typography,
} from "@wsui/base";

import { useMenu } from "../../../hooks/menus.js";

const DefaultLink = styled(Clickable)`
  text-decoration: underline;
  color: inherit;
  &.wsui-is-interactive:hover,
  &:focus-visible {
    text-decoration: none;
  }
`;

export default function FooterMenuBlock(props) {
  // eslint-disable-next-line no-unused-vars
  const theme = useTheme();
  props = useThemeProps({ props, name: "FooterMenuBlock" });
  props = useThemeProps({ props, name: "FooterBlock" });
  let {
    block,
    columnWidth = 40,
    gap = 8,
    headingVariant = "h3",
    typographyVariant = "description",
    components,
  } = props;
  let { Link = DefaultLink } = handleComponentsProp(components, {
    Link: DefaultLink,
  });

  let { title } = block;
  const menu = useMenu("FOOTER_BLOCK");
  let items = menu?.items;

  if (!items?.length) {
    return null;
  }

  return (
    <Typography variant={typographyVariant} as="nav">
      {!!title && (
        <Heading variant={headingVariant} marginAfter>
          {title}
        </Heading>
      )}
      <ul
        css={css`
          list-style: none;
          margin: 0;
          padding: 0;
          column-width: ${theme.getLength(columnWidth)};
          column-gap: ${theme.getLength(gap)};
          column-fill: balance;
        `}
      >
        {items.map(({ url, label, target }, index) => {
          return (
            <li
              key={index}
              css={css`
                margin-block-end: ${theme.getLength(2)};
              `}
            >
              <Link url={url} target={target}>
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </Typography>
  );
}
