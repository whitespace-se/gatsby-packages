import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import { ComponentProvider } from "../contexts/componentContext";
import * as focusWithinStyles from "../utils/focusWithin.module.css";

import * as defaultStyles from "./SearchTeaser.module.css";

SearchTeaser.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function SearchTeaser({
  as: Component = "article",
  children,
  className,
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <Component
      className={clsx(
        styles.component,
        focusWithinStyles.component,
        focusWithinStyles.outset,
        className,
      )}
      {...restProps}
    >
      <ComponentProvider
        component="teaser"
        props={{
          as: Component,
          styles,
          className,
          ...restProps,
        }}
      >
        {children}
      </ComponentProvider>
    </Component>
  );
}
