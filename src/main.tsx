import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import { MapProvider } from "./context/map-context";
import App from "./App.tsx";
// import "./App.css";
import theme from "./theme";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider theme={theme} resetCSS={true}>
        <MapProvider>
          <App />
        </MapProvider>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);
