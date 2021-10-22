// import { useID } from "@whitespace/components";
import { useFormikContext, useField } from "formik";
import PropTypes from "prop-types";
import React, { useEffect } from "react";

import { useSearch, useSearchParam } from "../../hooks";
import SelectField from "../SelectField";

// import * as styles from "./SearchFormSelectField.module.css";

SearchFormSelectField.propTypes = {
  label: PropTypes.node,
  name: PropTypes.string,
};

export default function SearchFormSelectField({ name, label, ...restProps }) {
  // const generateID = useID();
  const { setFieldValue, submitForm, values } = useFormikContext();
  const { paramType } = useSearchParam(name);
  const searchContext = useSearch();
  const [{ value }] = useField(name);

  let options =
    typeof paramType.options === "function"
      ? paramType.options({ ...searchContext, values })
      : paramType.options;

  if (!options || Object.values(options).length === 0) {
    return null;
  }

  return (
    <SelectField
      name={name}
      isMulti={!!paramType.multi}
      placeholder={label}
      value={value}
      onChange={(value) => {
        setFieldValue(name, value);
        setTimeout(submitForm, 0);
      }}
      options={options}
      {...restProps}
    />
  );
}
