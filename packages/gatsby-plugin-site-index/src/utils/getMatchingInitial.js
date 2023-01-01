const getInitial = require("./getInitial");

module.exports = function getMatchingInitial(locale, alphabet, string) {
  let initial = getInitial(locale, string);
  if (alphabet.includes(initial)) {
    return initial;
  }
  return (
    alphabet.find(
      (candidate) =>
        candidate.localeCompare(initial, locale, { sensitivity: "base" }) === 0,
    ) || ""
  );
};
