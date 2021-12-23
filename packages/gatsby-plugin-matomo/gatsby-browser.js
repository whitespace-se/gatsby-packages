export function onRouteUpdate(
  _,
  {
    includeInDevelopment = false,
    mtmDataVariableName = "mtm",
    routeChangeEventName = `gatsby-route-change`,
  },
) {
  if (process.env.NODE_ENV === `production` || includeInDevelopment) {
    // wrap inside a timeout to ensure the title has properly been changed
    setTimeout(() => {
      const data = mtmDataVariableName && window[mtmDataVariableName];

      const eventName = routeChangeEventName
        ? routeChangeEventName
        : `gatsby-route-change`;

      data.push({ event: eventName });
    }, 50);
  }
}
