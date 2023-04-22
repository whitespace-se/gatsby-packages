import { useID, Button, Link } from "@whitespace/components";
import { ensureArray } from "@whitespace/gatsby-plugin-search/src/utils";
import clsx from "clsx";
import { Field, useField } from "formik";
import PropTypes from "prop-types";
import React from "react";

import * as styles from "./ToggleButton.module.css";

function inArray(array, value, isEmpty = (value) => value === "") {
  array = ensureArray(array, isEmpty);
  value = ensureArray(value, isEmpty);
  if (array.length === 0 || value.length === 0) {
    return array.length === 0 && value.length === 0;
  }
  return value.every((v) => array.includes(v));
}

ToggleButton.propTypes = {
  name: PropTypes.any,
  id: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.node,
  value: PropTypes.any,
  appearance: PropTypes.string,
};

export default function ToggleButton({
  name,
  id,
  type = "checkbox",
  label,
  value,
  appearance = "button",
  ...restProps
}) {
  const generateID = useID();

  if (id == null) {
    id = generateID(name || "toggle");
  }

  const [, meta] = useField(name);

  const isInitial = inArray(meta.initialValue, value);
  const isChecked = inArray(meta.value, value);

  const Label = appearance === "link" ? Link : Button;

  return (
    <>
      <Field
        type={type}
        className={clsx(
          styles.input,
          isInitial && styles.isInitial,
          isChecked && styles.isChecked,
        )}
        name={name}
        id={id}
        value={value}
        {...restProps}
      />
      <Label className={clsx(styles.label)} htmlFor={id}>
        {label}
      </Label>
    </>
  );
}
