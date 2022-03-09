export function onRouteUpdate(
  { location, prevLocation },
  {
    disableContentImpressionTracking = false,
    disableLinkTracking = false,
    includeInDevelopment = false,
    routeChangeEventName = `gatsby-route-change`,
    trackPageViews = false,
  },
) {
  if (process.env.NODE_ENV !== `production` && !includeInDevelopment) {
    return;
  }

  const url = location && location.pathname + location.search + location.hash;
  const prevUrl =
    prevLocation &&
    prevLocation.pathname + prevLocation.search + prevLocation.hash;

  // wrap inside a timeout to ensure the title has properly been changed
  setTimeout(() => {
    const _mtm = window._mtm;
    const _paq = window._paq;

    if (trackPageViews) {
      const { title } = document;

      if (prevUrl) {
        _paq.push(["setReferrerUrl", prevUrl]);
      }

      _paq.push(["setCustomUrl", url]);
      _paq.push(["setDocumentTitle", title]);
      _paq.push(["trackPageView"]);
      if (disableLinkTracking) {
        _paq.push(["enableLinkTracking"]);
      }
      if (disableContentImpressionTracking) {
        _paq.push(["trackAllContentImpressions"]);
      }
    }

    if (routeChangeEventName !== false) {
      const eventName = routeChangeEventName
        ? routeChangeEventName
        : `gatsby-route-change`;

      _mtm.push({ event: eventName });
    }
  }, 50);
}
