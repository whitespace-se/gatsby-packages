// import { useID } from "@whitespace/components";
import { useFormikContext, useField } from "formik";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

import { useSearch, useSearchParam } from "../../hooks";
import SelectField from "../SelectField";

// import * as styles from "./SearchFormMonthSelectField.module.css";

SearchFormMonthSelectField.propTypes = {
  label: PropTypes.node,
  name: PropTypes.string,
};

export default function SearchFormMonthSelectField({
  name,
  label,
  ...restProps
}) {
  // const generateID = useID();
  const { setFieldValue, submitForm, values } = useFormikContext();
  const { paramType } = useSearchParam(name);
  const searchContext = useSearch();
  const [{ value }] = useField(name);

  let yearOptions =
    typeof paramType.yearOptions === "function"
      ? paramType.yearOptions({ ...searchContext, values })
      : paramType.yearOptions;

  let monthOptions =
    typeof paramType.monthOptions === "function"
      ? paramType.monthOptions({ ...searchContext, values })
      : paramType.monthOptions;

  if (/^\d{4}$/.test(value)) {
    monthOptions = monthOptions && [
      {
        ...monthOptions.find((option) => option.value === ""),
        value,
      },
      ...monthOptions.filter((option) => option.value.startsWith(value)),
    ];
  } else if (/^\d{4}-\d{2}$/.test(value)) {
    let year = value.substr(0, 4);
    monthOptions = monthOptions && [
      {
        ...monthOptions.find((option) => option.value === ""),
        value: year,
      },
      ...monthOptions.filter((option) => option.value.startsWith(year)),
    ];
    yearOptions = yearOptions?.map?.((option) => ({
      ...option,
      value: option.value === year ? value : option.value,
    }));
  } else {
    monthOptions = null;
  }

  // useEffect(() => {
  //   if (!options?.some?.((option) => option.value === value)) {
  //     setFieldValue(name, "");
  //   }
  // }, [JSON.stringify(options?.map?.((option) => option.value))]);

  if (!yearOptions || Object.values(yearOptions).length === 0) {
    return null;
  }

  return (
    <>
      <SelectField
        name={name}
        isMulti={false}
        placeholder={label}
        value={value}
        onChange={(value) => {
          setFieldValue(name, value);
          setTimeout(submitForm, 0);
        }}
        options={yearOptions}
        {...restProps}
      />
      {!!(monthOptions && Object.values(monthOptions).length) && (
        <SelectField
          name={name}
          isMulti={false}
          placeholder={label}
          value={value}
          onChange={(value) => {
            setFieldValue(name, value);
            setTimeout(submitForm, 0);
          }}
          options={monthOptions}
          {...restProps}
        />
      )}
    </>
  );
}
