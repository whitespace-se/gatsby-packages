import { useStaticQuery, graphql } from "gatsby";

export default function useCookieConsentSettings() {
  return useStaticQuery(graphql`
    query CookieConsentSettings {
      wp {
        whitespaceCookieConsent {
          active
          position
          strings {
            approveButton: allow
            declineButton: deny
            moreLinkText: readMore
            moreLinkUrl: readMoreURL
            description: text
            title
          }
        }
      }
    }
  `).wp.whitespaceCookieConsent;
}
