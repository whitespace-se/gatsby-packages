const path = require("path");
const GatsbyThemeComponentShadowingResolverPlugin = require("gatsby/dist/internal-plugins/webpack-theme-component-shadowing");

module.exports = {
  core: {
    builder: "webpack5",
  },
  stories: ["../src/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/preset-scss",
    // "@whitespace/storybook-addon-html/register",
  ],
  webpackFinal: async (config, { configType }) => {
    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].include.push(/\/gatsby-.*\/src/);
    config.module.rules[0].include.push(
      /node_modules\/(gatsby\/|gatsby-.*\/src)/,
    );
    config.module.rules[0].exclude = [
      /node_modules\/(?!gatsby\/|gatsby-.*\/src)/,
    ];

    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve("babel-loader");

    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
      require.resolve("@babel/preset-react"),
      require.resolve("@babel/preset-env"),
    ];

    // use @babel/plugin-proposal-class-properties for class arrow functions
    config.module.rules[0].use[0].options.plugins = [
      require.resolve("@babel/plugin-proposal-class-properties"),
      //     // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
      //     require.resolve('babel-plugin-remove-graphql-queries'),
    ];

    config.resolve.plugins.push(
      new GatsbyThemeComponentShadowingResolverPlugin({
        themes: [
          // {
          //   themeDir: path.resolve(
          //     require.resolve("gatsby-theme-municipio"),
          //     "..",
          //   ),
          //   themeName: "gatsby-theme-municipio",
          // },
          {
            themeDir: path.resolve("."),
            themeName: "default-site-plugin",
          },
        ],
        projectRoot: path.resolve("."),
        extensions: [".mjs", ".js", ".jsx", ".wasm", ".json", ".ts", ".tsx"],
      }),
    );

    return config;
  },
};
