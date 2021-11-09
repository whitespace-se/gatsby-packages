import capitalizeFirstLetter from "./capitalizeFirstLetter";

export default function formatMonth(date, locale) {
  return capitalizeFirstLetter(
    date.toLocaleDateString(locale, {
      month: "long",
    }),
    locale,
  );
}
