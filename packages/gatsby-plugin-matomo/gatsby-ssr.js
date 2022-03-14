import { oneLine } from "common-tags";
import React from "react";

const generateMTM = ({ mtmContainerId, mtmHost }) => oneLine`
  var _mtm = window._mtm = window._mtm || [];
  var _paq = window._paq = window._paq || [];
  _mtm.push({'mtm.startTime': (new Date().getTime()), 'event': 'mtmStart'});
  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.async=true; g.src='${mtmHost}/js/${mtmContainerId}.js'; s.parentNode.insertBefore(g,s);
`;

const generateMTMframe = ({ mtmContainerId, mtmHost }) =>
  oneLine`<iframe src="${mtmHost}/js/${mtmContainerId}.js" height="0" width="0" style="display: none; visibility: hidden" aria-hidden="true"></iframe>`;

export const onRenderBody = (
  { setHeadComponents, setPreBodyComponents, reporter },
  {
    includeInDevelopment = false,
    mtmContainerId,
    mtmHost = `https://www.matomo.com`,
    requireCookieConsent = false,
  },
) => {
  if (process.env.NODE_ENV === `production` || includeInDevelopment) {
    mtmHost = mtmHost.replace(/\/$/, ``);

    const inlineScripts = [];

    inlineScripts.push(
      <script
        key="plugin-matomo-mtm"
        dangerouslySetInnerHTML={{
          __html: oneLine`
          ${generateMTM({
            mtmContainerId,
            mtmHost,
          })}
          ${requireCookieConsent ? `_paq.push(['requireCookieConsent']);` : ""}
          `,
        }}
      />,
    );

    setHeadComponents(inlineScripts);

    setPreBodyComponents([
      <noscript
        key="plugin-matomo-mtm-noscript"
        dangerouslySetInnerHTML={{
          __html: generateMTMframe({
            mtmContainerId,
            mtmHost,
          }),
        }}
      />,
    ]);
  }
};
