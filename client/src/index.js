import React from "react";
import ReactDOM from "react-dom/client";
import App from "./app";
import { BrowserRouter } from "react-router-dom";
import { TitleProvider } from "./context/title";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { TouchBackend } from "react-dnd-touch-backend";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <DndProvider
      backend={TouchBackend}
      options={{
        enableMouseEvents: true,
        delayTouchStart: 200,
        ignoreContextMenu: true,
        touchSlop: 10,
      }}
    >
      <TitleProvider>
        <App />
      </TitleProvider>
    </DndProvider>
  </BrowserRouter>
);
