import Mustache from "mustache";
import PropTypes from "prop-types";

import { useHTMLProcessor } from "../hooks/html-processor";
import useMustacheData from "../hooks/useMustacheData";

PageContent.propTypes = {
  input: PropTypes.string,
  children: PropTypes.func.isRequired,
};

export default function PageContent({ input, children, ...restProps }) {
  let data = useMustacheData();
  let htmlString = Mustache.render(String(input || ""), data);
  let { processPageContent } = useHTMLProcessor();
  let { preamble, content } = processPageContent(htmlString, restProps);
  return children({ preamble, content });
}
