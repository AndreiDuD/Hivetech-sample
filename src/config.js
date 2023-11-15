export function getConfig() {

  return {
    domain: import.meta.env.VITE_DOMAIN,
    clientId: import.meta.env.VITE_CLIENT_ID,
    audience: import.meta.env.VITE_AUDIENCE,
  };
}
