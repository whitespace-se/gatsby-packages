module.exports = require("./node/config");

module.exports.falsey = function falsey(value) {
  try {
    return !JSON.parse(value);
  } catch {
    return !value;
  }
};

module.exports.truey = function truey(value) {
  try {
    return !!JSON.parse(value);
  } catch {
    return !!value;
  }
};
