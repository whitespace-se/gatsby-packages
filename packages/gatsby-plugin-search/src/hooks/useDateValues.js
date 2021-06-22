import { useTranslation } from "react-i18next";

let dateValues = {
  year: {},
  month: {},
};

export default function useDateValues(posts, type, condition) {
  const { t } = useTranslation();

  dateValues = {
    year: {
      0: t("allYearLabel"),
    },
    month: {
      0: t("allMonthLabel"),
    },
  };

  const addDate = (date, format) => {
    let formattedDate = new Date(date);

    if (Object.values(dateValues).indexOf(formattedDate) !== -1) return;

    if (format === "year") {
      dateValues.year[
        formattedDate.getFullYear()
      ] = formattedDate.getFullYear();
    } else {
      dateValues.month[`${formattedDate.getMonth() + 1}`] = t(
        `month${formattedDate.getMonth() + 1}Label`,
      );
    }
  };

  posts?.forEach(({ date }) => {
    if (Array.isArray(date)) {

      date.filter((item) => {
          return condition?.year
            ? condition?.year == new Date(item).getFullYear()
            : item;
        })
        .forEach((item) => addDate(item, type));
    } else {
      addDate(date, type);
    }
  });

  return dateValues[type];
}
