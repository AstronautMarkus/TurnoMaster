import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import NotFound from "./helpers/NotFound/NotFound";

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
      
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;