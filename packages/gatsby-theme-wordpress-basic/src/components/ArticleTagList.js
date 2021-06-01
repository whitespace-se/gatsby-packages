import React from "react";

import { usePageContext } from "../hooks";

// import * as defaultStyles from "./ArticleTagList.module.css";

ArticleTagList.propTypes = {};

export default function ArticleTagList({
  // styles = defaultStyles,
  taxonomy,
  // styles = {},
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
    <div {...restProps}>
      {"Kategorier"}
      {": "}
      {terms.map((term) => term.name).join(", ")}
    </div>
  );
}
