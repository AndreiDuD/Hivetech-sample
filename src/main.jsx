import { createRoot } from "react-dom/client";
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App.jsx";
import "./index.css";
import "./il8n";
import { getConfig } from "./config";
import history from "./utils/history.js";

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

const config = getConfig();

const providerConfig = {
  domain: config.domain,
  clientId: config.clientId,
  onRedirectCallback,
  authorizationParams: {
    redirect_uri: window.location.origin,
    audience: config.audience,
  },
};

const root = createRoot(document.getElementById('root'));
root.render(
    <Auth0Provider
      {...providerConfig}
    >
      <App />
    </Auth0Provider>
);
