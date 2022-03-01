import { graphql, useStaticQuery } from "gatsby";
import { createInstance } from "i18next";
import PropTypes from "prop-types";
import React, { useRef } from "react";
import { I18nextProvider } from "react-i18next";

PageWrapper.propTypes = {
  children: PropTypes.node,
  language: PropTypes.string,
};

export default function PageWrapper({ children, language }) {
  const i18nRef = useRef();

  const locales = useStaticQuery(graphql`
    query I18NextResources {
      allLocale {
        nodes {
          language
          data
        }
      }
    }
  `).allLocale.nodes;

  if (!i18nRef.current) {
    i18nRef.current = createInstance();
    i18nRef.current.init({
      lng: language,
      fallbackLng: "en",
      // defaultNS,
      // fallbackNS,
      react: {
        useSuspense: false,
      },
    });

    locales.forEach(({ language, data }) => {
      i18nRef.current.addResourceBundle(
        language,
        "translation",
        data,
        true,
        true,
      );
    });
  }

  if (i18nRef.current.language !== language) {
    i18nRef.current.changeLanguage(language);
  }

  return <I18nextProvider i18n={i18nRef.current}>{children}</I18nextProvider>;
}
