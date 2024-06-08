import React from "react";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { router } from "./routes/router";

import ThemeProvider from "./providers/ThemeProvider";
import ApolloClientProvider from "./providers/ApolloClientProvider";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <>
      {" "}
      <ToastContainer />
      <ThemeProvider>
        <ApolloClientProvider>
          <RouterProvider router={router} />
        </ApolloClientProvider>
      </ThemeProvider>
    </>
  );
};

export default App;
