/** @type {import('gatsby').GatsbyNode["onPreInit"]} */
exports.onPreInit = (args, options) => {
  if (options.mtmDataVariable) {
    options.mtmDataVariable = {
      type: typeof options.mtmDataVariable,
      value: options.mtmDataVariable,
    };

    if (options.mtmDataVariable.type === `function`) {
      options.mtmDataVariable.value = options.mtmDataVariable.value.toString();
    }
  }
};

exports.pluginOptionsSchema = ({ Joi }) =>
  Joi.object({
    mtmContainerId: Joi.string().description(
      `Matomo container ID that can be found in your MATOMO dashboard.`,
    ),
    includeInDevelopment: Joi.boolean()
      .default(false)
      .description(`Include Matomo plugin when running in development mode.`),
    routeChangeEventName: Joi.alternatives()
      .try(Joi.string(), Joi.boolean().equal(false))
      .default(`gatsby-route-change`)
      .description(
        `Name of the event that is triggered on every Gatsby route change.`,
      ),
    trackPageViews: Joi.boolean()
      .default(false)
      .description(`Whether to register page views on route changes.`),
    requireCookieConsent: Joi.boolean()
      .default(false)
      .description(`Whether to require cookie consent.`),
    mtmHost: Joi.string()
      .default(`https://www.matomo.com`)
      .description(`The origin where MTM is hosted.`),
  });
