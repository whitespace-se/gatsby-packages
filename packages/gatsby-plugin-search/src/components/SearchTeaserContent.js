import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import { useComponentContext } from "../contexts/componentContext";

SearchTeaserContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function SearchTeaserContent({
  children,
  className,
  styles,
  ...restProps
}) {
  let { styles: defaultStyles = {} } = useComponentContext("teaser");
  styles = styles ?? defaultStyles;
  return (
    <div className={clsx(styles.content, className)} {...restProps}>
      {children}
    </div>
  );
}
