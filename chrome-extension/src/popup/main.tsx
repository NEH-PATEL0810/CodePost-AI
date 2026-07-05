import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import Popup from "./App";
import { DocumentProvider } from "./context/DocumentContext";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <DocumentProvider>
      <Popup />
    </DocumentProvider>
  </StrictMode>
);
