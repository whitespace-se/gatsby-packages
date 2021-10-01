import React from "react";

import { StoreProvider } from "./src/hooks/store";

export const wrapRootElement = ({ element }) => {
  return (
    <StoreProvider initialState={{ answer: null, answeredAt: null }}>
      {element}
    </StoreProvider>
  );
};
