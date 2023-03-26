import React from "react";

import Archive from "../components/Archive";
import ClientOnly from "../components/ClientOnly";
import StaticMonthArchive from "../components/StaticMonthArchive";

export default function MonthArchiveTemplate() {
  return (
    <ClientOnly fallback={<StaticMonthArchive />}>
      <Archive />
    </ClientOnly>
  );
}
