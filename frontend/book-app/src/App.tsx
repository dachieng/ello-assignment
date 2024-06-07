import React from "react";
import Button from "@mui/material/Button";
import ThemeProvider from "./providers/ThemeProvider";
import ApolloClientProvider from "./providers/ApolloClientProvider";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <ThemeProvider>
      <ApolloClientProvider>
        <Button variant="contained" color="primary">
          This is the button
        </Button>
      </ApolloClientProvider>
    </ThemeProvider>
  );
};

export default App;
