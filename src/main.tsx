import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo";

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);
