const fs = require("fs");

const toml = require("toml");

exports.loadConfig = ({
  paths = ["./.env.toml", "./.env.local.toml"],
  target = process.env.TARGET || "local",
} = {}) => {
  const originalEnv = { ...process.env };
  paths.forEach((path) => {
    let configToml, loadedConfig;
    try {
      configToml = fs.readFileSync(path);
      loadedConfig = toml.parse(configToml);
    } catch {
      console.warn(`Could not load config from ${path}`);
      return;
    }
    let targetConfig =
      (target && loadedConfig.target && loadedConfig.target[target]) || {};
    delete loadedConfig.target;
    Object.assign(process.env, { ...loadedConfig, ...targetConfig });
  });
  Object.assign(process.env, originalEnv);
};
