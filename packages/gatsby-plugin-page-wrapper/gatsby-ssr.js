import React from "react";

import SSRPageElementWrapper from "./src/SSRPageElementWrapper";

export const wrapPageElement = ({ element, props }) => {
  return <SSRPageElementWrapper {...props}>{element}</SSRPageElementWrapper>;
};
