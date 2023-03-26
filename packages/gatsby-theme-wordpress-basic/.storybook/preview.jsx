import {
  IconProvider,
  ThemeProvider,
  mergeThemes,
  GlobalStyles,
} from "@wsui/base";
import standardTheme from "@wsui/theme-standard";
import GatsbyProvider from "./mocks/GatsbyProvider.jsx";
import { LocationProvider, InternalLinkElement } from "./mocks/location";

import "./preview.css";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      date: /Date$/,
    },
  },
  html: {
    root: "#storybook-root", // default: #root
  },
};

export const decorators = [
  (Story) => (
    <GatsbyProvider>
      <LocationProvider>
        <ThemeProvider
          theme={mergeThemes(standardTheme, {
            typography: {
              fonts: {
                Inter: "/fonts/Inter.var.woff2",
              },
            },
            components: {
              Clickable: {
                defaultProps: {
                  elements: {
                    internal: InternalLinkElement,
                  },
                },
              },
            },
          })}
        >
          <GlobalStyles />
          <IconProvider getIconSrc={(name) => `/icons/${name}.svg`}>
            <Story />
          </IconProvider>
        </ThemeProvider>
      </LocationProvider>
    </GatsbyProvider>
  ),
];
