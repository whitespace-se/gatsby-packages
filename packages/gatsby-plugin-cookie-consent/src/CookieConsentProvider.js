import PropTypes from "prop-types";
import React from "react";

import useBlockScripts from "./hooks/useBlockScripts";
import useCookieConsentSettings from "./hooks/useCookieConsentSettings";

CookieConsentProvider.propTypes = {
  children: PropTypes.node,
};

export default function CookieConsentProvider({ children }) {
  const { whitelist } = useCookieConsentSettings();

  if (whitelist) {
    console.warn(
      `Setting a whitelist through useCookieConsentSettings is deprecated and <CookieConsentProvider> is no longer used. Please remove it from your app and use plugin options to set the whitelist.`,
    );
    useBlockScripts({ whitelist });
  }

  return <>{children}</>;
}
