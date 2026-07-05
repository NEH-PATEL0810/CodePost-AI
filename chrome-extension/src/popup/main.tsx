import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../index.css";
import "highlight.js/styles/github.css";
import Popup from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Popup />
  </StrictMode>
);
