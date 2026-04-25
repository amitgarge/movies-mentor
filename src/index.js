import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Toaster } from "react-hot-toast";

// ✅ Mount the custom Toaster FIRST, before App
const toasterRoot = document.createElement("div");
document.body.appendChild(toasterRoot);

const toasterRootContainer = ReactDOM.createRoot(toasterRoot);
toasterRootContainer.render(
  <Toaster
    position="top-right"
    reverseOrder={false}
    toastOptions={{
      duration: 3000,
      style: {
        fontSize: "14px",
        borderRadius: "8px",
        padding: "8px 16px",
      },
      success: {
        style: { background: "#10B981", color: "#fff" },
      },
      error: {
        style: { background: "#EF4444", color: "#fff" },
      },
    }}
  />
);

// ✅ Then mount the main App
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
