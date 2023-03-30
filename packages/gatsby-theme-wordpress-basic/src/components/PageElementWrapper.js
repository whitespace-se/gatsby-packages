/* global GATSBY_LAYOUT_COMPONENT_PATH */

import { HeadingLevelProvider } from "@jfrk/react-heading-levels";
import { IDContextProvider } from "@jfrk/react-id";
import { StoreProvider } from "@whitespace/gatsby-hooks";
import PropTypes from "prop-types";
import React, { createContext } from "react";

import { PageContextProvider } from "../hooks";

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
            <SiteLayout>{children}</SiteLayout>
          </PageContextProvider>
        </StoreProvider>
      </IDContextProvider>
    </HeadingLevelProvider>
  );
}
