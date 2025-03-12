import React from "react";
import { Link } from "react-router-dom";

function TestPage1() {
  return (
    <div>
      <h1>Test Page 1</h1>
      <nav>
        <Link to="/dashboard/test2">Go to Test Page 2</Link>
      </nav>
    </div>
  );
}

export default TestPage1;
