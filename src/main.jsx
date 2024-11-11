import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextProvider from "./Context/Context.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="391923454039-f30anpmt19c5e1k9i9b0df87fqf853i1.apps.googleusercontent.com">
    <ContextProvider>
      <App />
    </ContextProvider>
  </GoogleOAuthProvider>
);
