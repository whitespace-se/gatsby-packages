import clsx from "clsx";
import React from "react";

import { ComponentProvider } from "../contexts/componentContext";
import * as focusWithinStyles from "../utils/focusWithin.module.css";

import * as defaultStyles from "./SearchTeaser.module.css";

export default function SearchTeaser({
  as: Component = "article",
  styles = defaultStyles,
  className,
  children,
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
