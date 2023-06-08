// 1. Import `extendTheme`
import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
const theme = extendTheme({
  styles: {
    global: {
      "html, body, #root": {
        margin: "0",
        padding: "0",
        width: "100%",
        height: "100%",
        overflowX: "hidden",
      },
      body: {
        textRendering: "optimizeSpeed",
        lineHeight: "1.5",
      },
      "*, *::after, *::before": {
        boxSizing: "border-box",
      },
      "html:focus-within": {
        scrollBehavior: "smooth",
      },
    },
  },
  colors: {
    brand: {
      white: "#FFFFFF",
    },
  },
});

export default theme;
