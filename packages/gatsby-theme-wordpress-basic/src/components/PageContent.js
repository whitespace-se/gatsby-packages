import { useHTMLProcessor } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks/html-processor";
import Mustache from "mustache";
import PropTypes from "prop-types";

import useMustacheData from "../hooks/useMustacheData";

PageContent.propTypes = {
  input: PropTypes.string,
  children: PropTypes.func.isRequired,
};

export default function PageContent({ input, children, ...restProps }) {
  let data = useMustacheData();
  let htmlString = Mustache.render(input, data);
  let { processPageContent } = useHTMLProcessor();
  let { preamble, content } = processPageContent(htmlString, restProps);
  return children({ preamble, content });
}
