const WP_URL = `${process.env.GATSBY_WORDPRESS_URL}`;

export function normalizeWordpressUrl(url) {
  if (typeof url !== "string") {
    return url;
  }
  if (url.startsWith(`${WP_URL}/`)) {
    return url.substring(WP_URL.length);
  }
  return url;
}
