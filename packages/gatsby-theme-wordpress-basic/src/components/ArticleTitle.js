import { H } from "@jfrk/react-heading-levels";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import { utilities } from "../foundation";
import { usePageContext } from "../hooks";

import * as defaultStyles from "./ArticleTitle.module.css";

ArticleTitle.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string
};

export default function ArticleTitle({
  styles = defaultStyles,
  className,
  ...restProps
}) {
  let {
    contentNode: { title, isFrontPage },
  } = usePageContext();

  return (
    <H className={clsx(styles.component, className, isFrontPage && utilities.visuallyHidden)} {...restProps}>
      {title}
    </H>
  );
}
