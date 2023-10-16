/** @jsx jsx */
import { jsx, css } from "@emotion/react";
import PropTypes from "prop-types";
import ReactSelect from "react-select";

import { useSelectStyles } from "../hooks";
import { normalizeOption, normalizeOptions } from "../utils";

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

export default function SelectField({
  options,
  value,
  onChange,
  isMulti,
  ...props
}) {
  let normalizedOptions = normalizeOptions(options);

  if (isMulti) {
    normalizedOptions = normalizedOptions.filter(
      (option) => option.value !== "",
    );
  }

  return (
    <ReactSelect
      {...props}
      css={css`
        input:focus {
          box-shadow: none;
        }
      `}
      options={normalizedOptions}
      styles={useSelectStyles()}
      isMulti={isMulti}
      value={
        Array.isArray(value)
          ? value.map((value) =>
              normalizedOptions.find((option) => option.value === value),
            )
          : normalizedOptions.find((option) => option.value === value)
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
