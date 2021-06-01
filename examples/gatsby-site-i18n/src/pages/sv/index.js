import * as React from "react";
import { useTranslation } from "react-i18next";

// styles
const pageStyles = {
  color: "#232129",
  padding: 96,
  fontFamily: "-apple-system, Roboto, sans-serif, serif",
};
const headingStyles = {
  marginTop: 0,
  marginBottom: 64,
  maxWidth: 320,
};

// markup
const IndexPage = () => {
  const { t } = useTranslation();
  return (
    <main style={pageStyles}>
      <title>{t("homePage")}</title>
      <h1 style={headingStyles}>{t("hello")}</h1>
    </main>
  );
};

export default IndexPage;
