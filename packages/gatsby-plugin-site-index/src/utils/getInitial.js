export default function getInitial(locale, string) {
  return (
    (
      // Matches letters, numbers and symbols (e.g. emojis)
      (string.match(/[\p{L}\p{N}\p{S}]/u) || [])[0] || ""
    ).toLocaleLowerCase(locale)
  );
}
