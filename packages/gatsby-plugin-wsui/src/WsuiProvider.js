import { ThemeProvider, GlobalStyles, IconProvider } from "@wsui/base";
import React from "react";

import theme from "./theme";

export default function WsuiProvider({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <IconProvider getIconSrc={(name) => `/icons/${name}.svg`}>
        {children}
      </IconProvider>
    </ThemeProvider>
  );
}
