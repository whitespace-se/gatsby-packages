import { createTheme } from "@wsui/base";

import InternalLinkElement from "./InternalLinkElement.jsx";

export default createTheme({
  colors: {},
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
