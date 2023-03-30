import React from "react";

import Archive from "../components/Archive";
import ClientOnly from "../components/ClientOnly";
import StaticYearArchive from "../components/StaticYearArchive";

export default function YearArchiveTemplate() {
  return (
    <ClientOnly fallback={<StaticYearArchive />}>
      <Archive />
    </ClientOnly>
  );
}
