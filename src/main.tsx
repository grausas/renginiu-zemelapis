import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { MapProvider } from "./context/map-context";
import AuthProvider from "./context/auth";
import App from "./App.tsx";
import "./Main.css";

import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MapProvider>
          <ChakraProvider theme={theme} resetCSS={true}>
            <App />
          </ChakraProvider>
        </MapProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
