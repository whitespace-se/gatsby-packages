module.exports = {
  transform: {
    "^.+\\.js$": [
      "esbuild-jest",
      {
        sourcemap: true,
        loaders: {
          ".js": "jsx",
        },
      },
    ],
  },
};
