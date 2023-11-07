import React from "react";
import ReactDOM from "react-dom/client";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { DndProvider as DndContextProvider } from "./context/DndContext";
import "./index.css";

import Router from "@/Router";
import { ThemeProvider } from "./components/theme-provider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <DndProvider backend={HTML5Backend}>
        <DndContextProvider>
          <Router />
        </DndContextProvider>
      </DndProvider>
    </ThemeProvider>
  </React.StrictMode>
);
