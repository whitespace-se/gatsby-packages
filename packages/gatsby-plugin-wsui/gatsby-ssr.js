import React from "react";

import WsuiProvider from "./src/WsuiProvider";

export function wrapPageElement({ element, props }, pluginOptions) {
  return (
    <WsuiProvider {...props} options={pluginOptions}>
      {element}
    </WsuiProvider>
  );
}
