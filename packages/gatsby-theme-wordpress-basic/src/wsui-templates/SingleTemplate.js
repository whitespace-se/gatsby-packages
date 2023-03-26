import { usePageContext } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks";
import { useThemeProps } from "@wsui/base";
import { camelCase, upperFirst } from "lodash";
import React, { Fragment } from "react";

import * as components from "./index.js";

const defaultGetTemplate = ({ pageContext, defaultTemplate, templates }) => {
  const isFrontPage = pageContext?.isFrontPage;
  const template = isFrontPage
    ? "frontPage"
    : pageContext?.pageAppearance?.template || pageContext.contentType.name;
  const componentName =
    template && upperFirst(camelCase(template)) + "Template";
  // eslint-disable-next-line import/namespace
  return (template && templates[componentName]) || defaultTemplate;
};

export default function SingleTemplate(props) {
  props = useThemeProps({ props, name: "TemplateController" });
  props = useThemeProps({ props, name: "SingleTemplate" });
  let {
    // eslint-disable-next-line import/namespace
    defaultTemplate = components["DefaultTemplate"],
    templates = components,
    getTemplate = defaultGetTemplate,
    ...restProps
  } = props;
  const pageContext = usePageContext();
  const Component =
    getTemplate(
      { pageContext, defaultTemplate, templates },
      defaultGetTemplate,
    ) || defaultGetTemplate({ pageContext, defaultTemplate, templates });

  return <Component {...restProps} />;
}
