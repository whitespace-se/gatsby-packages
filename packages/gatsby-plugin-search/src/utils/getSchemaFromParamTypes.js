import * as yup from "yup";

import normalizeOptions from "./normalizeOptions";

export default function getSchemaFromParamTypes(paramTypes) {
  let shape = {};
  Object.entries(paramTypes).forEach(
    ([
      param,
      {
        type,
        multi,
        // options,
        conditions,
      },
    ]) => {
      let subSchema = yup;
      switch (type) {
        case "string":
        case "date":
          {
            subSchema = subSchema.string().ensure();
          }
          break;
        default: {
          // Skip this param
          return;
        }
      }
      // if (options) {
      //   options = normalizeOptions(options);
      //   options = options.map(({ value }) => value);
      //   console.log(options);
      //   subSchema = subSchema.oneOf(options);
      // }
      if (multi) {
        subSchema = yup.array().of(subSchema).ensure();
      }
      if (conditions) {
        Object.entries(conditions).forEach(([param, test]) => {
          subSchema = subSchema.when(param, (value, schema) => {
            return test(value, schema) ? schema : schema.strip();
          });
        });
      }
      shape[param] = subSchema;
    },
  );
  return yup.object(shape);
}
