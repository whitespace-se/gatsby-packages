export default function capitalizeFirstLetter([first, ...rest], locale) {
  return [first.toLocaleUpperCase(locale), ...rest].join("");
}
