import React from "react";

import { Layout } from "./src/components/Layout";

export function wrapRootElement({ element }) {
  return <Layout>{element}</Layout>;
}
