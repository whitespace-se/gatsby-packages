import { useThemeProps } from "@wsui/base";
import { camelCase, upperFirst } from "lodash";
import React from "react";

import { usePageContext } from "../../hooks/page-context";

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

export default function TemplateController(props) {
  props = useThemeProps({ props, name: "TemplateController" });
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
