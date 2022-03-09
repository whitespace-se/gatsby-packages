import { useStore } from "@whitespace/gatsby-plugin-cookie-consent/src/hooks/store";
import React, { useEffect } from "react";

MatomoCookieHandler.propTypes = {};

/**
 * Pushes "setCookieConsentGiven" to Matomo if/when cookies are accepted
 */
export default function MatomoCookieHandler() {
  let [store] = useStore();

  let cookiesAreAccepted = store.answer === "accept";

  useEffect(() => {
    if (cookiesAreAccepted && typeof window !== "undefined") {
      window?._paq.push(["setCookieConsentGiven"]);
    }
  }, [cookiesAreAccepted]);

  return <pre>{JSON.stringify(store, null, 2)}</pre>;
}
