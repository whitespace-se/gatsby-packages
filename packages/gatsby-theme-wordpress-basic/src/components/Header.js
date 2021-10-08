import { SkipTo } from "@whitespace/components";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";

import * as defaultStyles from "./Header.module.css";
import HeaderFlyOutMenu from "./HeaderFlyOutMenu";
import HeaderLogo from "./HeaderLogo";
import HeaderMainMenu from "./HeaderMainMenu";

Header.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
};

export default function Header({
  styles = defaultStyles,
  className,
  ...restProps
}) {
  const { t } = useTranslation();
  return (
    <header className={clsx(styles.component, className)} {...restProps}>
      <SkipTo />
      <HeaderLogo linkTo="/" />
      <HeaderFlyOutMenu />
      <HeaderMainMenu aria-label={t("mainMenu")} />
    </header>
  );
}
