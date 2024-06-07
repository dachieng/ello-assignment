import React from "react";
import { ThemeProvider as XThemeProvider } from "@mui/material/styles";

import customTheme from "../theme";

interface Props {
  children: React.ReactNode;
}

const ThemeProvider: React.FC<Props> = ({ children }) => {
  return <XThemeProvider theme={customTheme}>{children}</XThemeProvider>;
};

export default ThemeProvider;
