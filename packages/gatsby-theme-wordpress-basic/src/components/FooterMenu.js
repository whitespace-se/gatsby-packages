import { Link } from "@whitespace/components";
import withComponentDefaults from "@whitespace/components/dist/withComponentDefaults";
import clsx from "clsx";
import { snakeCase } from "lodash";
import PropTypes from "prop-types";
import React from "react";

import { useMenu } from "../hooks/menus";

import * as defaultStyles from "./FooterMenu.module.css";

FooterMenu.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  menuName: PropTypes.string,
};

export default withComponentDefaults(FooterMenu, "footerMenu");

function FooterMenu({
  styles = defaultStyles,
  menuName = "mainMenu",
  className,
  ...restProps
}) {
  let menu = useMenu(snakeCase(menuName).toUpperCase());
  let items = menu?.items;
  if (!items?.length) {
    return null;
  }
  return (
    <nav className={clsx(styles.component, className)} {...restProps}>
      {
        <ul className={styles.list}>
          {items.map((item, index) => {
            return (
              <li key={index} className={styles.item}>
                <Link className={styles.link} to={item.url}>
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      }
    </nav>
  );
}
