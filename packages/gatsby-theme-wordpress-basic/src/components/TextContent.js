import clsx from "clsx";
import React from "react";

import * as defaultStyles from "./TextContent.module.css";

export default function TextContent({
  as: Component = "div",
  children,
  className,
  styles = defaultStyles,
  ...restProps
}) {
  return (
    <Component className={clsx(styles.component, className)} {...restProps}>
      {children}
    </Component>
  );
}
