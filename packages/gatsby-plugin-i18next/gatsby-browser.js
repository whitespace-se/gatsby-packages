import React from "react";

import PageWrapper from "./src/components/PageWrapper";

function getLanguageFromPageProps({ location }, languages, defaultLanguage) {
  let urlPrefix = location?.pathname?.split("/")[1];
  if (urlPrefix && languages.includes(urlPrefix)) {
    return urlPrefix;
  }
  return defaultLanguage;
}

export const wrapPageElement = ({ element, props }, pluginOptions) => {
  const { defaultLanguage = "en", languages = ["en"] } = pluginOptions;
  const language = getLanguageFromPageProps(props, languages, defaultLanguage);
  return <PageWrapper language={language}>{element}</PageWrapper>;
};
