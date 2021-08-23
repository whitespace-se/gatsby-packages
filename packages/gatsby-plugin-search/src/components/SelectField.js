import PropTypes from "prop-types";
import React from "react";
import ReactSelect from "react-select";

import { useSelectStyles } from "../hooks";

function normalizeOption(option) {
  if (typeof option !== "object") {
    return { value: option, label: option };
  }
  return option;
}

function normalizeOptions(options) {
  if (!Array.isArray(options)) {
    return Object.entries(options).map(([value, rest]) => ({
      ...normalizeOption(rest),
      value,
    }));
  }
  return options && options.map(normalizeOption);
}

SelectField.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.oneOfType([
    PropTypes.objectOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    ),
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    ),
  ]),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    ),
  ]),
};

export default function SelectField({ options, value, onChange, ...props }) {
  let normalizedOptions = normalizeOptions(options);

  return (
    <ReactSelect
      {...props}
      options={normalizedOptions}
      styles={useSelectStyles()}
      value={
        Array.isArray(value)
          ? value.map(
              (value) =>
                normalizedOptions.find((option) => option.value === value) ||
                normalizeOption(value),
            )
          : normalizedOptions.find((option) => option.value === value) ||
            normalizeOption(value)
      }
      onChange={
        onChange &&
        ((newValue) => {
          onChange(
            Array.isArray(newValue)
              ? newValue.map((option) =>
                  typeof option === "object" ? option.value : option,
                )
              : typeof newValue === "object"
              ? newValue.value
              : newValue,
          );
        })
      }
    />
  );
}
