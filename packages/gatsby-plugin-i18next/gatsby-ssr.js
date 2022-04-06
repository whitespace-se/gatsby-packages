import React from "react";

import PageWrapper from "./src/components/PageWrapper";

import { getLanguageFromPageProps } from ".";

export const wrapPageElement = ({ element, props }, pluginOptions) => {
  const { defaultLanguage = "en", languages = ["en"] } = pluginOptions;
  const language = getLanguageFromPageProps(props, languages, defaultLanguage);
  return <PageWrapper language={language}>{element}</PageWrapper>;
};
