import getInitial from "./getInitial";

export default function getMatchingInitial(locale, alphabet, string) {
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
}
