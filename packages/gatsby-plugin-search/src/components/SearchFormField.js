import { useFormikContext } from "formik";
import { camelCase, upperFirst } from "lodash-es";
import PropTypes from "prop-types";
import React from "react";

import { useSearchParam } from "../hooks";

import * as availableControls from "./search-form-fields";

SearchFormField.propTypes = {
  param: PropTypes.string.isRequired,
};
function fromControlToComponentName(controlType) {
  return controlType && `SearchForm${upperFirst(camelCase(controlType))}Field`;
}

export default function SearchFormField({ param, ...restProps }) {
  const { paramType, isForced } = useSearchParam(param);

  const { setFieldValue, setValues, submitForm, values } = useFormikContext();

  if (!(param in values) || isForced) {
    return null;
  }

  let componentName = fromControlToComponentName(paramType.control);
  let Component =
    // eslint-disable-next-line import/namespace
    componentName && availableControls[componentName];

  if (!Component) {
    return null;
  }

  return <Component name={param} {...restProps} />;
}
