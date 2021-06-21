import { mergeThemes } from "@whitespace/components";
import parentTheme from "@whitespace/gatsby-theme-wordpress-basic/src/theme";

var theme = mergeThemes(parentTheme, {
  // Define your theme here
});

export default theme;
