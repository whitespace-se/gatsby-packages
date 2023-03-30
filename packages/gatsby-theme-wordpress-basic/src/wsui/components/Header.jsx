/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import {
  Clickable,
  Icon,
  PageGrid,
  PageGridItem,
  useThemeProps,
} from "@wsui/base";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import HeaderHamburgerMenu from "./HeaderHamburgerMenu.jsx";
import HeaderLogo from "./HeaderLogo.jsx";

// import HeaderFlyOutMenu from "./HeaderFlyOutMenu";
// import HeaderLogo from "./HeaderLogo";
// import HeaderMainMenu from "./HeaderMainMenu";

export default function Header(inProps) {
  const { color = "primary.800", ...restProps } = useThemeProps({
    props: inProps,
    name: "Header",
  });
  const theme = useTheme();
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
            <HeaderLogo
              link="/"
              css={css`
                grid-area: logo;
              `}
            />
            <Clickable
              onClick={() => {
                setHamburgerOpen(true);
              }}
              aria-label={t("menu")}
              aria-expanded={String(hamburgerOpen)}
              aria-controls={"header-hamburger-menu"}
              css={css`
                grid-area: flyout;
                ${theme.styleUtils.buttonReset}
                cursor: pointer;
              `}
            >
              <Icon name="menu" size="2rem" />
            </Clickable>
          </div>
        </PageGridItem>
      </PageGrid>
      <HeaderHamburgerMenu
        open={hamburgerOpen}
        onClose={() => setHamburgerOpen(false)}
        id={"header-hamburger-menu"}
      />
    </header>
  );
}
