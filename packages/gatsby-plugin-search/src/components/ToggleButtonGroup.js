import cx from "classnames";
import React from "react";

import ToggleButton from "./ToggleButton";
import * as styles from "./ToggleButtonGroup.module.css";

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

export default function ToggleButtonGroup({
  name,
  multiple = false,
  options,
  className,
  itemAppearance = "button",
  id,
  ...restProps
}) {
  let normalizedOptions = normalizeOptions(options);
  return (
    <>
      <div
        role="group"
        className={cx(styles.group, className)}
        id={id}
        {...restProps}
      >
        {normalizedOptions.map((option, index) => {
          return (
            <ToggleButton
              key={option.value}
              name={name}
              id={`${id || name}-${index}`}
              type={multiple ? "checkbox" : "radio"}
              appearance={itemAppearance}
              {...option}
            />
          );
        })}
      </div>
    </>
  );
}
