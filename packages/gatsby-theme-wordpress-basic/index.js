exports.loadConfig = require("./node/config").loadConfig;

exports.falsey = function falsey(value) {
  try {
    return !JSON.parse(value);
  } catch {
    return !value;
  }
};

exports.truey = function truey(value) {
  try {
    return !!JSON.parse(value);
  } catch {
    return !!value;
  }
};
