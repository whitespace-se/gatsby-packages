export function getLanguageFromPageProps(
  { location },
  languages,
  defaultLanguage,
) {
  return getLanguageFromPathname(
    location && location.pathname,
    languages,
    defaultLanguage,
  );
}

export function getLanguageFromPathname(pathname, languages, defaultLanguage) {
  let urlPrefix = pathname && pathname.replace(/^\//, "").split("/")[0];
  if (urlPrefix && languages.includes(urlPrefix)) {
    return urlPrefix;
  }
  return defaultLanguage;
}
