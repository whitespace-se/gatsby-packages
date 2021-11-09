import { useID } from "@whitespace/components";
import { visuallyHidden } from "@whitespace/components/dist/utils/styles.module.css";
import { useFormikContext } from "formik";
import { kebabCase } from "lodash-es";
import PropTypes from "prop-types";
import React from "react";

import { useSearch, useSearchParam } from "../../hooks";
import ToggleButtonGroup from "../ToggleButtonGroup";

// import * as styles from "./SearchFormLinksField.module.css";

SearchFormLinksField.propTypes = {
  label: PropTypes.node,
  name: PropTypes.string,
};

export default function SearchFormLinksField({ name, label, ...restProps }) {
  const generateID = useID();
  const { submitForm } = useFormikContext();
  const { paramType } = useSearchParam(name);
  const searchContext = useSearch();

  let options =
    typeof paramType.options === "function"
      ? paramType.options({ ...searchContext })
      : paramType.options;

  if (!options || Object.values(options).length === 0) {
    return null;
  }

  return (
    <>
      <div
        id={generateID(`${kebabCase(name)}-label`)}
        className={visuallyHidden}
      >
        {label}
      </div>
      <ToggleButtonGroup
        aria-labelledby={generateID(`${kebabCase(name)}-label`)}
        options={options}
        name={name}
        onMouseUp={() => {
          setTimeout(submitForm, 0);
        }}
        itemAppearance="link"
        {...restProps}
      />
    </>
  );
}
