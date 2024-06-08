import React from "react";
import { RouterProvider } from "react-router-dom";

import ThemeProvider from "./providers/ThemeProvider";
import ApolloClientProvider from "./providers/ApolloClientProvider";
import { router } from "./routes/router";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <ThemeProvider>
      <ApolloClientProvider>
        <RouterProvider router={router} />
      </ApolloClientProvider>
    </ThemeProvider>
  );
};

export default App;
