/* eslint-disable ssr-friendly/no-dom-globals-in-module-scope */
let { blacklist = [], whitelist = [] } = window.pluginCookieConsentConfig;

if (window.location.host !== "") {
  // Allow all scripts on same origin
  whitelist.push(`/*`);
  whitelist.push(`${window.location.origin}/*`);

  // Allow all Chrome extensions
  whitelist.push(`chrome*`);
}

//convert strings to regex and escape special characters
whitelist = whitelist.length
  ? whitelist.map(function (domain) {
      return new RegExp(
        `^${domain
          .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
          .replace(/\*/g, ".*")}$`,
      );
    })
  : null;

//convert strings to regex and escape special characters
blacklist = blacklist.length
  ? blacklist.map(function (domain) {
      return new RegExp(
        `^${domain
          .replace(/[.+?^${}()|[\]\\]/g, "\\$&")
          .replace(/\*/g, ".*")}$`,
      );
    })
  : null;

window.yett.init({
  blacklist,
  whitelist,
});
