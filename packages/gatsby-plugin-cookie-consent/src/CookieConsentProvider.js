import PropTypes from "prop-types";
import React from "react";

import useBlockScripts from "./hooks/useBlockScripts";
import useCookieConsentSettings from "./hooks/useCookieConsentSettings";

CookieConsentProvider.propTypes = {
  children: PropTypes.node,
};

export default function CookieConsentProvider({ children }) {
  const { whitelist } = useCookieConsentSettings();

  useBlockScripts({ whitelist });

  return <>{children}</>;
}
