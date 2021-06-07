import { H, Section } from "@jfrk/react-heading-levels";
import {
  LazyMinisearchSearchBackendProvider,
  SearchContextDebug,
  SearchHits,
  URLSearchParamsProvider,
} from "@whitespace/gatsby-plugin-search";
import { Formik, Field, Form } from "formik";
import React from "react";
import * as yup from "yup";

const SearchPage = () => {
  return (
    <URLSearchParamsProvider
      forcedParams={{ contentType: "contact" }}
      schema={yup.object({
        query: yup.string().default(""),
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
                      {({ values, handleChange, submitForm }) => (
                        <Form>
                          <Field
                            type="search"
                            name="query"
                            value={values.query}
                          />
                          <button type="submit">{`Search`}</button>

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
