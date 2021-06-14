import { useLocation } from "@gatsbyjs/reach-router";
import { Icon, TreeMenu } from "@whitespace/components";
import { usePrevious } from "@whitespace/gatsby-hooks";
import clsx from "clsx";
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

import usePages from "../hooks/pages";
import { getTreeStructure } from "../utils/pageTree";

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
  const location = useLocation();
  const prevLocation = usePrevious(location);
  const allPages = usePages();
  const items = getTreeStructure(allPages);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (location !== prevLocation) {
      setExpanded(false);
    }
  }, [location, prevLocation]);
  return (
    <div className={clsx(styles.component, className)} {...restProps}>
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className={styles.toggle}
      >
        <Icon name="menu" />
      </button>
      {expanded && (
        <>
          <div className={styles.backdrop} onClick={() => setExpanded(false)} />
          <TreeMenu
            items={items}
            location={location}
            className={clsx(styles.menu)}
          />
        </>
      )}
    </div>
  );
}
