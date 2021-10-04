import React from "react";

import "./src/index.css";
import { Layout } from "./src/components/Layout";

export function wrapPageElement({ element }) {
  return <Layout>{element}</Layout>;
}
