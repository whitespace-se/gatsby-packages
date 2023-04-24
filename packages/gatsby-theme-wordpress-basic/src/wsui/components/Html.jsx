import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import useMustacheData from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/useMustacheData";
import Mustache from "mustache";

export default function Html({ children: input, ...restProps }) {
  let data = useMustacheData();
  let htmlString = Mustache.render(String(input || ""), data);
  let { processContent } = useHTMLProcessor();
  return processContent(htmlString, restProps);
}
