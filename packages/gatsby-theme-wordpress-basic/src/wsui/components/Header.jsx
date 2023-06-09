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
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import DefaultHamburgerMenu from "./HeaderHamburgerMenu.jsx";
import DefaultLogo from "./HeaderLogo.jsx";

const DefaultHamburgerMenuToggle = styled(Clickable)``;

// import HeaderFlyOutMenu from "./HeaderFlyOutMenu";
// import HeaderLogo from "./HeaderLogo";
// import HeaderMainMenu from "./HeaderMainMenu";

export default function Header(props) {
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
  let { HamburgerMenu, HamburgerMenuToggle, Logo } = handleComponentsProp(
    components,
    {
      HamburgerMenu: DefaultHamburgerMenu,
      HamburgerMenuToggle: DefaultHamburgerMenuToggle,
      Logo: DefaultLogo,
    },
  );

  const [hamburgerOpen, setHamburgerOpen] = useState(false);
  useEffect(() => {
    document.body.style.overflow = hamburgerOpen ? "hidden" : "";
  }, [hamburgerOpen]);
  const { t } = useTranslation();
  return (
    <header {...restProps}>
      <PageGrid
        css={css`
          background: ${theme.getColor(color)};
          color: ${theme.getColor([color, "text"])};
        `}
      >
        <PageGridItem colspan={12}>
          <div
            css={css`
              display: grid;
              grid-template-columns: max-content 1fr max-content;
              grid-template-areas: "logo main-menu flyout";
              padding-block: 1rem;
              gap: 2rem;
            `}
          >
            {/* TODO: Implement header content with WSUI components */}
            {/* <SkipTo />
            <HeaderMainMenu aria-label={t("mainMenu")} /> */}
            <Logo
              link="/"
              css={css`
                grid-area: logo;
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
