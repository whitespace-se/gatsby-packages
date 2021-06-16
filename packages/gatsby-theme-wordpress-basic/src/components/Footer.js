import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./Footer.module.css";
import FooterMenu from "./FooterMenu";

Footer.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
};

export default function Footer({
  styles = defaultStyles,
  className,
  ...restProps
}) {
  return (
    <footer className={clsx(styles.component, className)} {...restProps}>
      <FooterMenu />
    </footer>
  );
}
