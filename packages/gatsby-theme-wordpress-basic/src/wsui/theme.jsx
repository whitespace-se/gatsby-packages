import { createTheme } from "@wsui/base";

import { Image } from "./components";

export default createTheme({
  colors: {},
  components: {
    PageGrid: {
      defaultProps: {
        maxColspan: 7,
      },
    },
    Image: {
      defaultProps: {
        handler: Image,
      },
    },
  },
});
