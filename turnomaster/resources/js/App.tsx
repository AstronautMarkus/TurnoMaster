import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import NotFound from "./helpers/NotFound/NotFound";
import Example from "./components/Example/Example";
import TestPage1 from "./components/TestPage1/TestPage1";
import TestPage2 from "./components/TestPage2/TestPage2";
import TestPage3 from "./components/TestPage3/TestPage3";

function App() {
  return (
    <Layout children={
      <Routes>
        <Route path="/dashboard/*" element={<DashboardRoutes />} />
      </Routes>
    } />
  );
}

function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/example" element={<Example />} />
      <Route path="/test1" element={<TestPage1 />} />
      <Route path="/test2" element={<TestPage2 />} />
      <Route path="/test3" element={<TestPage3 />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;