import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/page-context";
import useMustacheData from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/useMustacheData";
import Mustache from "mustache";

export default function usePageContent(options) {
  let pageContext = usePageContext();
  let { content: input, ...rest } = pageContext || {};
  let data = useMustacheData();
  let htmlString = Mustache.render(String(input || ""), data);
  let { processPageContent } = useHTMLProcessor();
  let { heading, preamble, content } = processPageContent(htmlString, {
    extractHeading: true,
    ...rest,
    ...options,
  });
  return { heading, preamble, content };
}
