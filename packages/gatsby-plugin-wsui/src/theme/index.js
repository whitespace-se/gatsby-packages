import InternalLinkElement from "@whitespace/gatsby-theme-wordpress-basic/src/components/InternalLinkElement";
import { createTheme } from "@wsui/base";

export default createTheme({
  components: {
    Clickable: {
      defaultProps: {
        elements: {
          internal: InternalLinkElement,
        },
      },
    },
  },
});
