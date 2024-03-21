import { css, useTheme } from "@emotion/react";
import useCookieConsentSettings from "@whitespace/gatsby-plugin-cookie-consent/src/hooks/useCookieConsentSettings";
import CookieDialog from "@whitespace/gatsby-plugin-cookie-consent/src/wsui/components/CookieDialog.jsx";
import { Link, Section, handleComponentsProp, useThemeProps } from "@wsui/base";
import clsx from "clsx";
import React from "react";

// import { usePageContext } from "../hooks";

import AlertBanner from "./AlertBanner.jsx";
import DefaultFooter from "./Footer.jsx";
import DefaultHeader from "./Header.jsx";
import Html from "./Html.jsx";
import AdminBar from "./AdminBar.jsx";

export default function SiteLayout(props) {
  const theme = useTheme();
  props = useThemeProps({ props, name: "SiteLayout" });
  let { children, footerMargin = 0, headerMargin = 0, components } = props;
  let { Header, Footer } = handleComponentsProp(components, {
    Header: DefaultHeader,
    Footer: DefaultFooter,
  });
  const { position, active, strings } = useCookieConsentSettings();

  return (
    <div
      css={css`
        display: grid;
        grid-template-rows: max-content max-content 1fr max-content;
        min-height: 100vh;
      `}
    >
      <AdminBar
        css={css`
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 2;
        `}
      />
      <div>
        <AlertBanner className={clsx("wsui-screen-only")} />
        <Header
          css={css`
            margin-bottom: ${theme.getLength(headerMargin)};
          `}
        />
      </div>
      <main id="main">{children}</main>
      <Section>
        <Footer
          css={css`
            margin-top: ${theme.getLength(footerMargin)};
          `}
        />
        <CookieDialog
          position={position}
          active={active}
          title={strings.title}
          description={
            strings.description && (
              <p>
                <Html>{strings.description}</Html>{" "}
                {strings.moreLinkUrl && (
                  <Link to={strings.moreLinkUrl}>{strings.moreLinkText}</Link>
                )}
              </p>
            )
          }
          confirmButtonProps={{
            title: strings.approveButton,
          }}
          denyButtonProps={{
            title: strings.declineButton,
          }}
        />
      </Section>
    </div>
  );
}
