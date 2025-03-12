import React from "react";
import { Link } from "react-router-dom";

function TestPage2() {
  return (
    <div>
      <h1>Test Page 2</h1>
      <nav>
        <Link to="/dashboard/test1">Go to Test Page 1</Link>
        <Link to="/dashboard/test3">Go to Test Page 3</Link>
      </nav>
    </div>
  );
}

export default TestPage2;
