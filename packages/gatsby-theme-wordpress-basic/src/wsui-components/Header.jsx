/** @jsx jsx */
import { css, jsx, useTheme } from "@emotion/react";
import { PageGrid, useThemeProps } from "@wsui/base";
// import { useTranslation } from "react-i18next";

// import HeaderFlyOutMenu from "./HeaderFlyOutMenu";
// import HeaderLogo from "./HeaderLogo";
// import HeaderMainMenu from "./HeaderMainMenu";

export default function Header(inProps) {
  const { color = "primary.800", ...restProps } = useThemeProps({
    props: inProps,
    name: "Header",
  });
  const theme = useTheme();
  // const { t } = useTranslation();
  return (
    <PageGrid
      as="header"
      css={css`
        background: ${theme.getColor(color)};
        color: ${theme.getColor([color, "text"])};
        display: grid;
        grid-template-columns: max-content 1fr max-content;
        grid-template-areas: "logo . flyout" "main-menu main-menu main-menu";
        padding: 1rem;
        gap: 2rem;
      `}
      {...restProps}
    >
      {/* <SkipTo />
      <HeaderLogo linkTo="/" />
      <HeaderFlyOutMenu />
      <HeaderMainMenu aria-label={t("mainMenu")} /> */}
    </PageGrid>
  );
}
