export default function useCookieConsentSettings() {
  return {
    whitelist: ["https://whitespace.analys.co/*"],
    active: true,
    position: "bottom",
    strings: {
      approveButton: "Acceptera",
      declineButton: "Neka",
      moreLinkText: "Läs mer",
      moreLinkUrl: "https://localhost:8080",
      description:
        "Lorem ipsum dolor sit amet, this is gatsby plugin cookie consent.",
      title: "Cookie consent",
    },
  };
}
