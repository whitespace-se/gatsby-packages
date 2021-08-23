import PropTypes from "prop-types";
import React from "react";

import context from "../context";

import useRemoteSearchFetch from "./useRemoteSearchFetch";

RemoteSearchBackendProvider.propTypes = {
  children: PropTypes.node,
  settings: PropTypes.object,
};

export default function RemoteSearchBackendProvider({ children, settings }) {
  const { Provider } = context;
  const [response, setRequest] = useRemoteSearchFetch(settings);
  return <Provider value={[response, setRequest]}>{children}</Provider>;
}
