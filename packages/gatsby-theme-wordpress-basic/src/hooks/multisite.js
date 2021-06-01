export function useIsMultisite() {
  return !!process.env.GATSBY_WORDPRESS_MULTISITE;
}
