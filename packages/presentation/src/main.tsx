import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div data-mode="light" className="h-full">
      <App />
    </div>
  </StrictMode>,
);
