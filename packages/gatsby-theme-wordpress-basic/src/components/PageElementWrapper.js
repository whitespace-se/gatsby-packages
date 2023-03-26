/* global GATSBY_LAYOUT_COMPONENT_PATH */

import { HeadingLevelProvider } from "@jfrk/react-heading-levels";
import { IDContextProvider } from "@jfrk/react-id";
import {
  IconProvider,
  ThemeProvider,
  URLTransformerProvider,
} from "@whitespace/components";
import { StoreProvider } from "@whitespace/gatsby-hooks";
import PropTypes from "prop-types";
import React, { createContext } from "react";

import { PageContextProvider } from "../hooks";
import theme from "../theme";

PageElementWrapper.propTypes = {
  children: PropTypes.node,
  pageContext: PropTypes.any,
};

export const pageWrapperContext = createContext();

export const PageWrapperContextProvider = pageWrapperContext.Provider;

const SiteLayout = require(GATSBY_LAYOUT_COMPONENT_PATH).default;

export default function PageElementWrapper({ pageContext, children }) {
  return (
    <HeadingLevelProvider>
      <IDContextProvider>
        <StoreProvider
          initialState={{
            cookieConsent: { answer: null, answeredAt: null },
          }}
        >
          <PageContextProvider value={pageContext}>
            <ThemeProvider theme={theme}>
              <IconProvider getIconSrc={(name) => `/icons/${name}.svg`}>
                <URLTransformerProvider
                  transformURL={(url) =>
                    process.env.GATSBY_WORDPRESS_UPLOADS_URL &&
                    url?.startsWith(
                      process.env.GATSBY_WORDPRESS_URL + "/wp-content/uploads/",
                    )
                      ? url.replace(
                          process.env.GATSBY_WORDPRESS_URL +
                            "/wp-content/uploads",
                          process.env.GATSBY_WORDPRESS_UPLOADS_URL,
                        )
                      : url?.startsWith(
                          process.env.GATSBY_WORDPRESS_URL + "/wp-",
                        )
                      ? url
                      : url?.replace(process.env.GATSBY_WORDPRESS_URL, "")
                  }
                >
                  <SiteLayout>{children}</SiteLayout>
                </URLTransformerProvider>
              </IconProvider>
            </ThemeProvider>
          </PageContextProvider>
        </StoreProvider>
      </IDContextProvider>
    </HeadingLevelProvider>
  );
}
