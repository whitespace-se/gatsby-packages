import React from "react";

export default function WPDefaultBlock({ block, componentName }) {
  if (process.env.NODE_ENV === "production") {
    return null;
  }
  return (
    <details>
      <summary>
        <code>{`Unimplemented <${componentName}/>`}</code>
      </summary>
      <pre>
        <code>{JSON.stringify(block, null, 2)}</code>
      </pre>
    </details>
  );
}
