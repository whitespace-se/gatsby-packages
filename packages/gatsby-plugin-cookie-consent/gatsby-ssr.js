import React from "react";

import init from "!!raw-loader!./src/init.js";
import yett from "!!raw-loader!@jeanfredrik/yett/dist/yett.min.js";

export const onPreRenderHTML = ({
  getHeadComponents,
  replaceHeadComponents,
}) => {
  const headComponents = getHeadComponents();
  headComponents.sort((x, y) => {
    let keys = [
      "plugin-cookie-consent-script-blocker",
      "plugin-cookie-consent-config",
      "plugin-cookie-consent-init",
    ];
    return Number(keys.includes(y.key)) - Number(keys.includes(x.key));
  });
  replaceHeadComponents(headComponents);
};

export const onRenderBody = (
  { setHeadComponents },
  { whitelist, head = false },
) => {
  const config = {
    whitelist,
  };
  let scripts = [
    <script
      key="plugin-cookie-consent-script-blocker"
      dangerouslySetInnerHTML={{
        __html: yett,
      }}
    />,
  ];
  if (head) {
    scripts.push(
      <script
        key="plugin-cookie-consent-config"
        dangerouslySetInnerHTML={{
          __html: `
        window.pluginCookieConsentConfig = ${JSON.stringify(config)};
      `,
        }}
      />,
      <script
        key="plugin-cookie-consent-init"
        dangerouslySetInnerHTML={{
          __html: init,
        }}
      />,
    );
  }
  setHeadComponents(scripts);
};
