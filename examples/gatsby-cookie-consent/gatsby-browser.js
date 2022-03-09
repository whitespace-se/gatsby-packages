import CookieConsentProvider from "@whitespace/gatsby-plugin-cookie-consent/src/CookieConsentProvider";
import React from "react";

import { Layout } from "./src/components/Layout";
import MatomoCookieHandler from "./src/components/MatomoCookieHandler";
import "./src/index.css";

export const wrapRootElement = ({ element }) => {
  return <CookieConsentProvider>{element}</CookieConsentProvider>;
};

export function wrapPageElement({ element }) {
  return (
    <Layout>
      <MatomoCookieHandler />
      {element}
    </Layout>
  );
}
