import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import { TitleProvider } from "./context/title";
import { DndProvider } from "react-dnd";
import { getBackendOptions, MultiBackend } from "@minoru/react-dnd-treeview";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <DndProvider backend={MultiBackend} options={getBackendOptions()}>
      <TitleProvider>
        <App />
      </TitleProvider>
    </DndProvider>
  </BrowserRouter>
);
