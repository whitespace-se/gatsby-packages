import clsx from "clsx";
import React from "react";

import { useHTMLProcessor, usePageContext } from "../hooks";

import TextContent from "./TextContent";
import WPBlocks from "./WPBlocks";

// import * as defaultStyles from "./ArticleBody.module.css";

ArticleBody.propTypes = {};

export default function ArticleBody({
  // styles = defaultStyles,
  styles = {},
  ...restProps
}) {
  let {
    contentNode: { content: contentHTML, contentMedia, blocksJSON },
  } = usePageContext();

  const { processPageContent } = useHTMLProcessor();
  let { preamble, content } = processPageContent(contentHTML, { contentMedia });

  return (
    <TextContent {...restProps}>
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
