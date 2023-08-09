import {
  ThemeProvider,
  GlobalStyles,
  IconProvider,
  backgroundColorContext,
} from "@wsui/base";
import React from "react";

import theme from "./theme.jsx";

export default function WsuiProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <backgroundColorContext.Provider value={theme.getColor("white")}>
        <GlobalStyles />
        <IconProvider getIconSrc={(name) => `/icons/${name}.svg`}>
          {children}
        </IconProvider>
      </backgroundColorContext.Provider>
    </ThemeProvider>
  );
}
