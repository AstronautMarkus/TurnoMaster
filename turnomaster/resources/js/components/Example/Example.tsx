import React from "react";

import useTitle from "../../hooks/UseTitle";

function Example() {
  useTitle("Example Page");
  return (
    <>
      <h1>Example Page</h1>
      <p>This is an example page.</p>
    </>
  );
}

export default Example;
