// src/theme.js
import { createTheme } from "@mui/material/styles";

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#5ACCCC",
      light: "#CFFAFA",
      dark: "#53C2C2",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#335C6E",
      light: "#53C2C2",
      dark: "#28B8B8",
      contrastText: "#FABD33",
    },
    error: {
      main: "#F76434",
    },
    warning: {
      main: "#FABD33",
      dark: "#FAAD00",
    },
    info: {
      main: "#4AA088",
    },
    success: {
      main: "#28B8B8",
    },
  },
});

export default customTheme;
