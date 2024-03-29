import { oneLine } from "common-tags";
import React from "react";

const generateMTM = ({
  mtmContainerId,
  mtmHost,
  mtmDataVariableName,
}) => oneLine`
  var _mtm = window.${mtmDataVariableName} = window.${mtmDataVariableName} || [];
  _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtmStart'});
  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.async=true; g.src='${mtmHost}${
  mtmHost.startsWith("https://cdn.matomo.cloud/") ? "" : "/js"
}/${mtmContainerId}.js'; s.parentNode.insertBefore(g,s);
`;

const generateMTMSite = ({
  mtmSiteId,
  mtmHost,
  mtmPAQDataVariableName,
}) => oneLine`
  var _paq = window.${mtmPAQDataVariableName} = window.${mtmPAQDataVariableName} || [];
  /*
  _paq.push(['trackPageView']);
  _paq.push(['enableLinkTracking']);
  */
  (function() {
    var u="${mtmHost.replace(/\/$/, "")}/";
    _paq.push(['setTrackerUrl', u+'matomo.php']);
    _paq.push(['setSiteId', ${mtmSiteId}]);
    var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
    g.type='text/javascript'; g.async=true; g.src=u+'matomo.js'; s.parentNode.insertBefore(g,s);
  })();
`;

const generateMTMPAQ = ({ mtmPAQDataVariableName }) => oneLine`
  var _paq = window.${mtmPAQDataVariableName} = window.${mtmPAQDataVariableName} || [];
`;

const generateMTMframe = ({ mtmContainerId, mtmHost }) =>
  oneLine`<iframe src="${mtmHost}${
    mtmHost.startsWith("https://cdn.matomo.cloud/") ? "" : "/js"
  }/${mtmContainerId}.js" height="0" width="0" style="display: none; visibility: hidden" aria-hidden="true"></iframe>`;

const generateDefaultDataVariable = (
  mtmDataVariable,
  reporter,
  mtmDataVariableName,
) => {
  let result = `window.${mtmDataVariableName} = window.${mtmDataVariableName} || [];`;

  if (mtmDataVariable.type === `function`) {
    result += `window.${mtmDataVariableName}.push((${mtmDataVariable.value})());`;
  } else {
    if (
      mtmDataVariable.type !== `object` ||
      mtmDataVariable.value.constructor !== Object
    ) {
      reporter.panic(
        `Oops the plugin option "default mtmDataVariable" should be a plain object. "${mtmDataVariable}" is not valid.`,
      );
    }

    result += `window.${mtmDataVariableName}.push(${JSON.stringify(
      mtmDataVariable.value,
    )});`;
  }

  return oneLine`${result}`;
};

export const onRenderBody = (
  { setHeadComponents, setPreBodyComponents, reporter },
  {
    includeInDevelopment = false,
    mtmContainerId,
    mtmSiteId,
    mtmDataVariableName = `mtm`,
    mtmDefaultDataVariable,
    mtmHost = `https://www.matomo.com`,
    mtmPAQDataVariableName = `paq`,
    mtmPAQDefaultDataVariable,
    requireCookieConsent = false,
  },
) => {
  if (process.env.NODE_ENV === `production` || includeInDevelopment) {
    let defaultMTMCode = ``;
    let defaultMTMPAQCode = ``;

    if (mtmDefaultDataVariable) {
      defaultMTMCode = generateDefaultDataVariable(
        mtmDefaultDataVariable,
        reporter,
        mtmDataVariableName,
      );
    }

    if (mtmPAQDefaultDataVariable) {
      defaultMTMPAQCode = generateDefaultDataVariable(
        mtmPAQDefaultDataVariable,
        reporter,
        mtmPAQDataVariableName,
      );
    }

    mtmHost = mtmHost.replace(/\/$/, ``);

    const inlineScripts = [];

    if (mtmContainerId) {
      inlineScripts.push(
        <script
          key="plugin-matomo-mtm"
          dangerouslySetInnerHTML={{
            __html: oneLine`
            ${defaultMTMCode}
            ${generateMTM({
              mtmContainerId,
              mtmHost,
              mtmDataVariableName,
            })}`,
          }}
        />,
      );
    } else if (mtmSiteId && mtmPAQDataVariableName) {
      inlineScripts.push(
        <script
          key="plugin-matomo-mtm-site"
          dangerouslySetInnerHTML={{
            __html: oneLine`
            ${defaultMTMCode}
            ${generateMTMSite({
              mtmSiteId,
              mtmHost,
              mtmPAQDataVariableName,
            })}`,
          }}
        />,
      );
    }

    if (mtmPAQDataVariableName) {
      inlineScripts.push(
        <script
          key="plugin-matomo-mtm-paq"
          dangerouslySetInnerHTML={{
            __html: oneLine`
            ${defaultMTMPAQCode}
            ${generateMTMPAQ({
              mtmPAQDataVariableName,
            })}
            ${
              requireCookieConsent ? `_paq.push(['requireCookieConsent']);` : ""
            }
            `,
          }}
        />,
      );
    }

    setHeadComponents(inlineScripts);

    if (mtmContainerId) {
      setPreBodyComponents([
        <noscript
          key="plugin-matomo-mtm"
          dangerouslySetInnerHTML={{
            __html: generateMTMframe({
              mtmContainerId,
              mtmHost,
              mtmDataVariableName,
            }),
          }}
        />,
      ]);
    }
  }
};
