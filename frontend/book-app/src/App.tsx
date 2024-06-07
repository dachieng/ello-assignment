import React from "react";
import Button from "@mui/material/Button";
import ThemeProvider from "./providers/ThemeProvider";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <ThemeProvider>
      <Button variant="contained" color="primary">
        This is the button
      </Button>
    </ThemeProvider>
  );
};

export default App;
