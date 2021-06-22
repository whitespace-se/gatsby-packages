import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import { useComponentContext } from "../contexts/componentContext";

SearchTeaserMeta.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  styles: PropTypes.objectOf(PropTypes.string),
};

export default function SearchTeaserMeta({
  children,
  className,
  styles,
  ...restProps
}) {
  let { styles: defaultStyles = {} } = useComponentContext("teaser");
  styles = styles ?? defaultStyles;
  return (
    <div className={clsx(styles.meta, className)} {...restProps}>
      {children}
    </div>
  );
}
