import { H } from "@jfrk/react-heading-levels";
import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import { utilities } from "../foundation";
import { usePageContext } from "../hooks";

// import * as defaultStyles from "./ArticleTitle.module.css";

ArticleTitle.propTypes = {};

export default function ArticleTitle({
  // styles = defaultStyles,
  // styles = {},
  ...restProps
}) {
  let {
    contentNode: { title, isFrontPage },
  } = usePageContext();

  return (
    <H className={clsx(isFrontPage && utilities.visuallyHidden)} {...restProps}>
      {title}
    </H>
  );
}
