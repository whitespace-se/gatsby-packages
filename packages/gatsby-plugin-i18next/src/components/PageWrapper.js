import { graphql, useStaticQuery } from "gatsby";
import i18next from "i18next";
import PropTypes from "prop-types";
import React, { useEffect, useRef, useState } from "react";
import { I18nextProvider } from "react-i18next";

PageWrapper.propTypes = {
  children: PropTypes.node,
  language: PropTypes.string,
};

export default function PageWrapper({ children, language }) {
  const [i18nIsLoaded, setI18nIsLoaded] = useState(false);
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

  useEffect(() => {
    const i18n = i18next.createInstance();
    i18n
      .init({
        lng: language,
        fallbackLng: "en",
        // defaultNS,
        // fallbackNS,
        react: {
          useSuspense: false,
        },
      })
      .then(() => {
        setI18nIsLoaded(true);
      });

    locales.forEach(({ language, data }) => {
      i18n.addResourceBundle(language, "translation", data, true, true);
    });
    i18nRef.current = i18n;
  }, []);

  useEffect(() => {
    const i18n = i18nRef.current;
    if (i18n) {
      i18n.changeLanguage(language);
    }
  }, [language]);

  const i18n = i18nRef.current;

  if (!i18nIsLoaded) {
    return null;
  }

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
