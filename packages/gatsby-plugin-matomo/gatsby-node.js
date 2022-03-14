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
    mtmDefaultDataVariable: Joi.alternatives()
      .try(Joi.object(), Joi.function())
      .default(null)
      .description(
        `Data variable to be set before Matomo plugin is loaded. Should be an object or a function.`,
      ),
    mtmDataVariableName: Joi.string().description(`Data variable name.`),
    mtmPAQDefaultDataVariable: Joi.alternatives()
      .try(Joi.object(), Joi.function())
      .default(null)
      .description(
        `Data variable for PAQ to be set before Matomo plugin is loaded. Should be an object or a function.`,
      ),
    mtmPAQDataVariableName: Joi.string().description(`PAQ Data variable name.`),
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
