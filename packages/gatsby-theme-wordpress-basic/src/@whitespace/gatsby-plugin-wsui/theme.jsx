import parentTheme from "@whitespace/gatsby-plugin-wsui/src/theme.jsx";
import { mergeThemes } from "@wsui/base";

import childTheme from "../../wsui/theme.jsx";

export default mergeThemes(parentTheme, childTheme);
