import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import ContextProvider from "./Context/Context.jsx";
import { Auth0Provider } from "@auth0/auth0-react";

createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="Your Auth0 domain"
    clientId="Your Auth0 client ID"
    redirectUri={window.location.origin}
  >
    <ContextProvider>
      <App />
    </ContextProvider>
  </Auth0Provider>
);
