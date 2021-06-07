import { H, Section } from "@jfrk/react-heading-levels";
import {
  LazyMinisearchSearchBackendProvider,
  SearchContextDebug,
  SearchHits,
  URLSearchParamsProvider,
} from "@whitespace/gatsby-plugin-search";
import { Formik, Field, Form } from "formik";
import React from "react";
import ReactSelect from "react-select";
import * as yup from "yup";

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

function Select({ options, value, onChange, ...props }) {
  let normalizedOptions = normalizeOptions(options);

  return (
    <ReactSelect
      {...props}
      options={normalizedOptions}
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

const SearchPage = () => {
  return (
    <URLSearchParamsProvider
      forcedParams={{}}
      schema={yup.object({
        query: yup.string().default(""),
        contentType: yup
          .string()
          .default("")
          .when("query", (query, schema) => (query ? schema : schema.strip())),
        tags: yup
          .array()
          .of(yup.string())
          .ensure()
          .when("contentType", (contentType, schema) =>
            ["post", "page", "event"].includes(contentType)
              ? schema
              : schema.strip(),
          ),
        sort: yup
          .string()
          .default("")
          .when("query", (query, schema) => (query ? schema : schema.strip())),
      })}
    >
      {({ params, setParams, schema }) => {
        return (
          <LazyMinisearchSearchBackendProvider preload={true}>
            {({ /*aggregations,*/ hits }) => {
              return (
                <main>
                  <H>Search 2</H>
                  <Section>
                    <Formik
                      initialValues={params}
                      enableReinitialize={true}
                      validationSchema={schema}
                      onSubmit={async (values) => {
                        setParams(values);
                      }}
                    >
                      {({
                        values,
                        handleChange,
                        submitForm,
                        setFieldValue,
                      }) => (
                        <Form>
                          <Field
                            type="search"
                            name="query"
                            value={values.query}
                          />
                          <button type="submit">{`Search`}</button>

                          {"contentType" in values && (
                            <div role="group">
                              <label>
                                <Field
                                  type="radio"
                                  name="contentType"
                                  value=""
                                  onChange={(event) => {
                                    handleChange(event);
                                    setTimeout(submitForm, 0);
                                  }}
                                />
                                {`All types`}
                              </label>
                              <label>
                                <Field
                                  type="radio"
                                  name="contentType"
                                  value="page"
                                  onChange={(event) => {
                                    handleChange(event);
                                    setTimeout(submitForm, 0);
                                  }}
                                />
                                {`Pages`}
                              </label>
                              <label>
                                <Field
                                  type="radio"
                                  name="contentType"
                                  value="post"
                                  onChange={(event) => {
                                    handleChange(event);
                                    setTimeout(submitForm, 0);
                                  }}
                                />
                                {`Posts`}
                              </label>
                              <label>
                                <Field
                                  type="radio"
                                  name="contentType"
                                  value="contact"
                                  onChange={(event) => {
                                    handleChange(event);
                                    setTimeout(submitForm, 0);
                                  }}
                                />
                                {`Contacts`}
                              </label>
                            </div>
                          )}

                          {"tags" in values && (
                            <Select
                              name="tags"
                              isMulti={true}
                              value={values.tags}
                              onChange={(value) => {
                                setFieldValue("tags", value);
                                setTimeout(submitForm, 0);
                              }}
                              options={{
                                foo: "Foo",
                                bar: "Bar",
                                baz: "Baz",
                              }}
                            />
                          )}

                          {"sort" in values && (
                            <div role="group">
                              <label>
                                <Field
                                  type="radio"
                                  name="sort"
                                  value=""
                                  onChange={(event) => {
                                    handleChange(event);
                                    setTimeout(submitForm, 0);
                                  }}
                                />
                                {`Relevance`}
                              </label>
                              <label>
                                <Field
                                  type="radio"
                                  name="sort"
                                  value="publishDate:desc"
                                  onChange={(event) => {
                                    handleChange(event);
                                    setTimeout(submitForm, 0);
                                  }}
                                />
                                {`Publish date`}
                              </label>
                            </div>
                          )}
                        </Form>
                      )}
                    </Formik>
                    <SearchContextDebug />
                    <H>Results</H>
                    {hits && hits.length > 0 && <SearchHits hits={hits} />}
                  </Section>
                </main>
              );
            }}
          </LazyMinisearchSearchBackendProvider>
        );
      }}
    </URLSearchParamsProvider>
  );
};

export default SearchPage;
