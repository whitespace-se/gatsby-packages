import Mustache from "mustache";

import { useHTMLProcessor } from "../../hooks/html-processor";
import useMustacheData from "../../hooks/useMustacheData";

export default function Html({ children: input, ...restProps }) {
  let data = useMustacheData();
  let htmlString = Mustache.render(String(input || ""), data);
  let { processContent } = useHTMLProcessor();
  return processContent(htmlString, restProps);
}
