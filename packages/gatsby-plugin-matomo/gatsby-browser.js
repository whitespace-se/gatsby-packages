export function onRouteUpdate(_, pluginOptions) {
  if (
    process.env.NODE_ENV === `production` ||
    pluginOptions.includeInDevelopment
  ) {
    // wrap inside a timeout to ensure the title has properly been changed
    setTimeout(() => {
      const data = pluginOptions.mtmDataVariableName
        ? window[pluginOptions.mtmDataVariableName]
        : window.mtmDataVariable;
      const eventName = pluginOptions.routeChangeEventName
        ? pluginOptions.routeChangeEventName
        : `gatsby-route-change`;

      data.push({ event: eventName });
    }, 50);
  }
}
