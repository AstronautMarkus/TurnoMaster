import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";

const rootElement = document.getElementById("app");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <App />
  );
} else {
  console.error("Root element with id 'app' not found.");
}