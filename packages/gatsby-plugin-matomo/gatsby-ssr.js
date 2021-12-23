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
  g.async=true; g.src='${mtmHost}/js/${mtmContainerId}.js'; s.parentNode.insertBefore(g,s);
`;

const generateMTMPAQ = ({ mtmPAQDataVariableName }) => oneLine`
  var _paq = window.${mtmPAQDataVariableName} = window.${mtmPAQDataVariableName} || [];
`;

const generateMTMframe = ({ mtmContainerId, mtmHost }) =>
  oneLine`<iframe src="${mtmHost}/js/${mtmContainerId}.js" height="0" width="0" style="display: none; visibility: hidden" aria-hidden="true"></iframe>`;

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
    mtmContainerId,
    includeInDevelopment = false,
    mtmDefaultDataVariable,
    mtmDataVariableName = `mtm`,
    mtmHost = `https://www.matomo.com`,
    mtmPAQDefaultDataVariable,
    mtmPAQDataVariableName = `paq`,
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

    if (mtmPAQDataVariableName) {
      inlineScripts.push(
        <script
          key="plugin-matomo-mtm-paq"
          dangerouslySetInnerHTML={{
            __html: oneLine`
            ${defaultMTMPAQCode}
            ${generateMTMPAQ({
              mtmPAQDataVariableName,
            })}`,
          }}
        />,
      );
    }

    setHeadComponents(inlineScripts);

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
};
