import CookieConsent from "@whitespace/gatsby-plugin-cookie-consent/src/components";
import useCookieConsentSettings from "@whitespace/gatsby-plugin-cookie-consent/src/hooks/useCookieConsentSettings";
import { Link } from "gatsby";
import React from "react";

export function Layout({ children }) {
  const { active, strings } = useCookieConsentSettings();

  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
          </ul>
        </nav>
      </header>
      {children}
      <CookieConsent cookieConsentSettings={strings} active={active} />
    </>
  );
}
