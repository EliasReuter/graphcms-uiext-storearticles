import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const baseURL = "https://api-eu-central-1.graphcms.com/v2/";
const apiKey = "cl1eyp2gh2pc901z7amoq8axs";
const environment = "/master";

const url = baseURL + apiKey + environment;

const httpLink = createHttpLink({
  uri: url,
  headers: {
    authorization: `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NDg3MjkwMzgsImF1ZCI6WyJodHRwczovL2FwaS1ldS1jZW50cmFsLTEuZ3JhcGhjbXMuY29tL3YyL2NsMWV5cDJnaDJwYzkwMXo3YW1vcThheHMvbWFzdGVyIiwiaHR0cHM6Ly9tYW5hZ2VtZW50LW5leHQuZ3JhcGhjbXMuY29tIl0sImlzcyI6Imh0dHBzOi8vbWFuYWdlbWVudC5ncmFwaGNtcy5jb20vIiwic3ViIjoiOTljNDYxYzYtZWZlMy00NjM4LWE2NjItZjRmNTkzOTk4MmNkIiwianRpIjoiY2tsdXpicmxwNW9sOTAxeHY3MzI1OHRqZCJ9.m9qyH1YlhcAhLQJGQTntOEdi1dhP5xW-jOtLUc4n8FsfDN4D560IJUPGSKVthqRzohpNq62KJqgIbN8_giKFZ_YZXmCZgbFEwwmhkGrNTS_dyrK3-pACWufPI64Zp45eaGPC3xMU4j0X45zKHBkcuBDR6TC-EJTjOZI-veEwvXVi11iwegIGoFSOeUaNd86gO1kv7yWHdQXXZlzSoxJtb7Xg9t3mOfuxqo6B8_CMWLRqdCl0yWNgSGMTq8k3Wk4yS7anFD6A5BRSQYvzP1JC5eXwT8XwvHcr-rkT01sjiDthTeNTba46m8hIfTmA6brUGVmaB9Um8VGQGyuISBokry7zxVRY1KshFbTFnJ1FLTLsSL_Wsht6qNXQ5nuye2seJ9wsjB1Yxhr11MbglSB4Cz2zLIT-AQDTwgWNHD8SfQ76XXr49oJHj8i8Gxb8B9eQboFfhvzlJ6jB9NSBk4Ui2ExXUsYDWZD3LyYnnDEJDmHCiXimYPxN1Uok9Y38RsodBFXdgdh0Yw3Vk4Hcy03shZXwm1dwhsi_QpU3f39j_VeehJttvJ6Aq62z9OZtq3vOqnHzJFoIr2sC59F0cMkRzzveAow344XbWJxNHkPL45VvEdLoXr2pnwqvODSj8bDLOLd2nzJQ1IMJXD5wcJh4AlIL5pZoWu9YqZew6OABG5Y`,
  },
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
