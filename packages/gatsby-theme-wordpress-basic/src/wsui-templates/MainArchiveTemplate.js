import React from "react";

import Archive from "../components/Archive";
import ClientOnly from "../components/ClientOnly";
import StaticMainArchive from "../components/StaticMainArchive";

export default function MainArchiveTemplate() {
  return (
    <ClientOnly fallback={<StaticMainArchive />}>
      <Archive />
    </ClientOnly>
  );
}
