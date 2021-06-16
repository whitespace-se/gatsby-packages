import clsx from "clsx";
import PropTypes from "prop-types";
import React from "react";

import { useHTMLProcessor, usePageContext } from "../hooks";

import * as defaultStyles from "./ArticleBody.module.css";
import TextContent from "./TextContent";
import WPBlocks from "./WPBlocks";

ArticleBody.propTypes = {
  styles: PropTypes.objectOf(PropTypes.string),
  className: PropTypes.string,
};

export default function ArticleBody({
  styles = defaultStyles,
  className,
  ...restProps
}) {
  let {
    contentNode: { content: contentHTML, contentMedia, blocksJSON },
  } = usePageContext();

  const { processPageContent } = useHTMLProcessor();
  let { preamble, content } = processPageContent(contentHTML, { contentMedia });

  return (
    <TextContent className={clsx(styles.component, className)} {...restProps}>
      {blocksJSON ? (
        <>
          <WPBlocks
            blocks={JSON.parse(blocksJSON)}
            contentMedia={contentMedia}
          />
        </>
      ) : (
        <>
          {preamble && <div className={clsx(styles.preamble)}>{preamble}</div>}
          {content}
        </>
      )}
    </TextContent>
  );
}
