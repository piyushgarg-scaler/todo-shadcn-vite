import React from "react";
import ReactDOM from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
import App from "./App.tsx";
import { ThemeProvider } from "./context/Theme.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <ThemeProvider defaultTheme="dark">
        <App />
      </ThemeProvider>
    </ReduxProvider>
  </React.StrictMode>
);
