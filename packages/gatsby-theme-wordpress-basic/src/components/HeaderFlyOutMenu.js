import { Icon } from "@whitespace/components";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import * as defaultStyles from "./HeaderFlyOutMenu.module.css";

HeaderFlyOutMenu.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
};

export default function HeaderFlyOutMenu({
  styles = defaultStyles,
  className,
  ...restProps
}) {
  return (
    <div className={clsx(styles.component, className)} {...restProps}>
      <Icon name="menu" />
    </div>
  );
}
