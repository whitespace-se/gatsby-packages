/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import styled from "@emotion/styled";
import {
  Clickable,
  Icon,
  PageGrid,
  PageGridItem,
  handleComponentsProp,
  useThemeProps,
} from "@wsui/base";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import DefaultHamburgerMenu from "./HeaderHamburgerMenu.jsx";
import DefaultLogo from "./HeaderLogo.jsx";
import DefaultMainMenu from "./HeaderMainMenu.jsx";

const DefaultHamburgerMenuToggle = styled(Clickable)``;

// import HeaderFlyOutMenu from "./HeaderFlyOutMenu";
// import HeaderLogo from "./HeaderLogo";
// import HeaderMainMenu from "./HeaderMainMenu";

export default function Header(props) {
  const { t } = useTranslation();
  const theme = useTheme();

  props = useThemeProps({
    props,
    name: "Header",
  });

  let {
    color = "primary.800",
    components,
    disableHamburgerMenu = false,
    ...restProps
  } = props;

  let { HamburgerMenu, HamburgerMenuToggle, Logo, MainMenu } =
    handleComponentsProp(components, {
      HamburgerMenu: DefaultHamburgerMenu,
      HamburgerMenuToggle: DefaultHamburgerMenuToggle,
      Logo: DefaultLogo,
      MainMenu: DefaultMainMenu,
    });

  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = hamburgerOpen ? "hidden" : "";
  }, [hamburgerOpen]);

  return (
    <header {...restProps}>
      <PageGrid
        css={css`
          background: ${theme.getColor(color)};
          color: ${theme.getColor([color, "text"])};
          box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
        `}
      >
        <PageGridItem colspan={12}>
          <div
            css={css`
              display: grid;
              grid-template-columns: max-content minmax(0, 1fr) max-content;
              grid-template-areas: "logo main-menu flyout";
              padding-block: 1rem;
              gap: ${theme.getLength([4, 8])};
              align-items: center;
            `}
          >
            {/* TODO: Implement header content with WSUI components */}
            {/* <SkipTo />
             */}
            <Logo
              link="/"
              css={css`
                grid-area: logo;
              `}
            />
            <MainMenu
              className={clsx("wsui-screen-only")}
              css={css`
                align-self: stretch;
                display: grid;
                align-content: center;
                grid-template-columns: minmax(0, 1fr);
                @supports not
                  selector(:has(.wsui-inline-list.wsui-is-content-visible)) {
                  border-left: 2px solid ${theme.getColor("border")};
                  padding-left: ${theme.getLength([4, 8])};
                }
                &:has(.wsui-inline-list.wsui-is-content-visible) {
                  border-left: 2px solid ${theme.getColor("border")};
                  padding-left: ${theme.getLength([4, 8])};
                }
              `}
            />
            {!disableHamburgerMenu && (
              <HamburgerMenuToggle
                onClick={() => {
                  setHamburgerOpen(true);
                }}
                aria-label={t("menu")}
                aria-expanded={String(hamburgerOpen)}
                aria-controls={"header-hamburger-menu"}
                className={clsx("wsui-screen-only")}
                css={css`
                  grid-area: flyout;
                  cursor: pointer;
                `}
              >
                <Icon name="menu" size="2rem" />
              </HamburgerMenuToggle>
            )}
          </div>
        </PageGridItem>
      </PageGrid>
      {!disableHamburgerMenu && (
        <HamburgerMenu
          open={hamburgerOpen}
          onClose={() => setHamburgerOpen(false)}
          id={"header-hamburger-menu"}
        />
      )}
    </header>
  );
}
