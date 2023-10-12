import Mustache from "mustache";

import { useHTMLProcessor } from "./html-processor";
import { usePageContext } from "./page-context";
import useMustacheData from "./useMustacheData";

export default function usePageContent(options) {
  let pageContext = usePageContext();
  let { content: input, ...rest } = pageContext || {};
  let data = useMustacheData();
  let htmlString = Mustache.render(String(input || ""), data);
  let { processPageContent } = useHTMLProcessor();
  let { heading, headingContent, preamble, content } = processPageContent(
    htmlString,
    {
      extractHeading: true,
      ...rest,
      ...options,
    },
  );
  return { heading, headingContent, preamble, content };
}
