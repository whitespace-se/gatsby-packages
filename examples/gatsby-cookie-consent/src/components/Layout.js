import CookieConsent from "@whitespace/gatsby-plugin-cookie-consent/src/components";
import useCookieConsentSettings from "@whitespace/gatsby-plugin-cookie-consent/src/hooks/useCookieConsentSettings";
import { Link } from "gatsby";
import PropTypes from "prop-types";
import React from "react";

Layout.propTypes = {
  children: PropTypes.node,
};

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
            <li>
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>
      </header>
      {children}
      <CookieConsent cookieConsentSettings={strings} active={active} />
    </>
  );
}
