import React from "react";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

interface Props {
  children: React.ReactNode;
}

const ApolloClientProvider: React.FC<Props> = ({ children }) => {
  const url = process.env.REACT_APP_API_URL;

  const client = new ApolloClient({
    uri: url,
    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
