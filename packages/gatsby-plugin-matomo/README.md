# Gatsby Plugin for Matomo

Integrates your site with Matomo.

## Install

```
yarn add @whitespace/gatsby-plugin-matomo
```

## How to use

```js
// gatsby-config.js

plugins: [
  {
    resolve: "gatsby-plugin-matomo",
    options: {
      mtmHost: "YOUR_SELF_HOSTED_ORIGIN",
      mtmContainerId: "YOUR_MATOMO_CONTAINER_ID",
      includeInDevelopment: false,
      routeChangeEventName: "gatsby-route-change", // Set this `false` to disable events
      trackPageViews: false, // Change to `true` to track page views
      requireCookieConsent: false, // Change to true to require cookie consent. See below how to handle consent.
    },
  },
];
```

### Integration with @whitespace/gatsby-plugin-cookie-consent

If you are using @whitespace/gatsby-plugin-cookie-consent it’s recommended to
whitelist the container url and hook into the store to check if consent has been
given:

1. Add this to `gatsby-browser.js`:

```js
// gatsby-browser.js

import MatomoCookieHandler from "./src/components/MatomoCookieHandler";

export function wrapPageElement({ element }) {
  return (
    <>
      <MatomoCookieHandler />
      {element}
    </>
  );
}
```

2. And this to `src/components/MatomoCookieHandler.js`:

```js
// src/components/MatomoCookieHandler.js

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
      window._paq.push(["setCookieConsentGiven"]);
    }
  }, [cookiesAreAccepted]);

  return null;
}
```
