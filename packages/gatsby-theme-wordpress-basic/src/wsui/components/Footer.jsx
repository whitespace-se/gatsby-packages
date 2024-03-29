/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Clickable,
  InlineList,
  PageGrid,
  PageGridItem,
  Stack,
  handleComponentsProp,
  useThemeProps,
} from "@wsui/base";
import clsx from "clsx";

import { useMenu } from "../../hooks/menus";
import useFooterBlocks from "../../hooks/useFooterBlocks";

import FooterBlockController from "./FooterBlockController.jsx";
import DefaultLogo from "./FooterLogo.jsx";

const DefaultLink = styled(Clickable)`
  text-decoration: inherit;
  color: inherit;
  font-weight: 600;
  font-size: ${({ theme }) => theme.getLength([3.25, 3.75])};
  &.wsui-is-interactive:hover,
  &:focus-visible {
    text-decoration: underline;
  }
`;

export default function Footer(inProps) {
  const theme = useTheme();
  const {
    color = "primary.800",
    spacing,
    gap = [7.5, 15],
    blocksMargin = [12, 12],
    bannerMargin = 4,
    bannerBorderColor = "white",
    components,
    legalMenu = "LEGAL",
    className,
    ...restProps
  } = useThemeProps({
    props: inProps,
    name: "Footer",
  });
  let { LegalMenuLink, Logo } = handleComponentsProp(components, {
    LegalMenuLink: DefaultLink,
    Logo: DefaultLogo,
  });
  const columns = useFooterBlocks();

  let legalMenuItems = useMenu(legalMenu)?.items;

  return (
    <footer
      css={css`
        background: ${theme.getColor(color)};
        color: ${theme.getColor([color, "text"])};
      `}
      className={clsx("wsui-screen-only", className)}
      {...restProps}
    >
      <PageGrid
        spacing={spacing}
        rowGap={blocksMargin}
        gap={gap}
        css={css`
          padding-block: ${theme.getLength(blocksMargin)};
        `}
      >
        {columns.map(({ blocks, colspan }, columnIndex) => (
          <PageGridItem key={columnIndex} colspan={[colspan, 12]}>
            <Stack justifyContent="start" direction="column">
              {blocks.map((block, blockIndex) => (
                <FooterBlockController key={blockIndex} block={block} />
              ))}
            </Stack>
          </PageGridItem>
        ))}
      </PageGrid>
      <PageGrid
        css={css`
          background: ${theme.getColor(color)};
          color: ${theme.getColor([color, "text"])};
        `}
        spacing={spacing}
        // rowGap={blocksMargin}
      >
        <PageGridItem colspan={12}>
          <div
            css={css`
              padding-block: ${theme.getLength(bannerMargin)};
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
              gap: ${theme.getLength(gap)};
              align-items: center;
              border-top: 1px solid ${theme.getColor(bannerBorderColor)};
            `}
          >
            <InlineList
              overflow="visible"
              spacing={[4, 8]}
              css={css`
                flex-shrink: 1;
              `}
            >
              {!!legalMenuItems?.length &&
                legalMenuItems.map(({ url, label, target }, index) => {
                  return (
                    <LegalMenuLink url={url} target={target} key={index}>
                      {label}
                    </LegalMenuLink>
                  );
                })}
            </InlineList>
            <Logo
              css={css`
                max-width: 100%;
                flex-shrink: 1;
                min-width: 0;
              `}
            />
          </div>
        </PageGridItem>
      </PageGrid>
    </footer>
  );
}
