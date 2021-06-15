import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";


import { usePageContext } from "../hooks";

import * as defaultStyles from "./ArticleTagList.module.css";

ArticleTagList.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  taxonomy: PropTypes.arrayOf(PropTypes.shape({name: PropTypes.string})),
  className: PropTypes.string
};

export default function ArticleTagList({
  styles = defaultStyles,
  taxonomy,
  className,
  ...restProps
}) {
  // const { t } = useTranslation();
  let {
    contentNode: { [taxonomy]: { nodes: terms } = {} },
  } = usePageContext();

  if (!terms?.length) {
    return null;
  }

  return (
    <div className={clsx(styles.component, className)} {...restProps}>
      {"Kategorier"}
      {": "}
      {terms.map((term) => term.name).join(", ")}
    </div>
  );
}
