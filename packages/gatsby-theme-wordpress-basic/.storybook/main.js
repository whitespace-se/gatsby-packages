export default {
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@whitespace/storybook-addon-html",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: true,
  },
  staticDirs: ["./static"],
  refs: {
    wsui: {
      title: "WSUI",
      url: "https://wsui.dev.w8e.se",
      expanded: false, // optional, true by default
    },
  },
};
