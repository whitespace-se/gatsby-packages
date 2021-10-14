import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import Mustache from "mustache";
import PropTypes from "prop-types";

import useMustacheData from "../hooks/useMustacheData";

HTML.propTypes = {
  children: PropTypes.string,
};

export default function HTML({ children: mustacheString, ...restProps }) {
  let data = useMustacheData();
  let htmlString = Mustache.render(mustacheString, data);
  let { processContent } = useHTMLProcessor();
  return processContent(htmlString, restProps);
}
