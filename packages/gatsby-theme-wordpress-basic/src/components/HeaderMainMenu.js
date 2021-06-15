import { Link } from "@whitespace/components";
import { useComponentSize } from "@whitespace/gatsby-hooks";
import clsx from "clsx";
import { snakeCase } from "lodash";
import PropTypes from "prop-types";
import React, { useRef } from "react";

import { useMenu } from "../hooks/menus";

import * as defaultStyles from "./HeaderMainMenu.module.css";

HeaderMainMenu.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
  menuName: PropTypes.string,
};

export default function HeaderMainMenu({
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
  const navRef = useRef();
  const listRef = useRef();
  const { width: navWidth } = useComponentSize(navRef);
  const { width: listWidth } = useComponentSize(listRef);
  return (
    <nav
      ref={navRef}
      className={clsx(
        styles.component,
        className,
        navWidth < listWidth && styles.hidden,
      )}
      {...restProps}
    >
      {
        <ul ref={listRef} className={styles.list}>
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
