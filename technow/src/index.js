import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import { GlobalToastProvider } from "./Context/ToastContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <GlobalToastProvider> */}
      <App />
    {/* </GlobalToastProvider> */}
  </React.StrictMode>
);
