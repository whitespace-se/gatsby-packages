import * as React from "react";

import ClientOnly from "../components/ClientOnly";
import SiteSearch from "../components/SiteSearch";

export default function SearchTemplate() {
  return (
    <ClientOnly fallback={null}>
      <SiteSearch />
    </ClientOnly>
  );
}
