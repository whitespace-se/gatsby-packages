// import { useID } from "@whitespace/components";
import { useTaxonomies } from "@whitespace/gatsby-theme-wordpress-basic/src/hooks";
import { useFormikContext, useField } from "formik";
import PropTypes from "prop-types";
import React from "react";

import { useSearch, useSearchParam } from "../../hooks";
import SelectField from "../SelectField";

// import * as styles from "./SearchFormSelectField.module.css";

SearchFormSelectField.propTypes = {
  label: PropTypes.node,
  name: PropTypes.string,
};

export default function SearchFormSelectField({ name, ...restProps }) {
  // const generateID = useID();
  const { setFieldValue, submitForm, values } = useFormikContext();
  const { paramType } = useSearchParam(name);
  const taxonomies = useTaxonomies();

  const searchContext = useSearch();
  const [{ value }] = useField(name);

  let options =
    typeof paramType.options === "function"
      ? paramType.options({ ...searchContext, taxonomies, values })
      : paramType.options;

  if (!options || Object.values(options).length === 0) {
    return null;
  }

  return (
    <SelectField
      name={name}
      isMulti={!!paramType.multi}
      placeholder={paramType.label}
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
