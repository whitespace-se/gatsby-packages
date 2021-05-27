import React from "react";

import BrowserPageElementWrapper from "./src/BrowserPageElementWrapper";

export const wrapPageElement = ({ element, props }) => {
  return (
    <BrowserPageElementWrapper {...props}>{element}</BrowserPageElementWrapper>
  );
};
