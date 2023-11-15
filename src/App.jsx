import { BrowserRouter as Router } from "react-router-dom";
import { createContext, Suspense, lazy } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingIndicator from "./page-loader/PageLoader";
import { RoutesConfig } from "./routes";
const Navbar = lazy(() => import("./components/Navbar/Navbar"));
import Footer from "./components/Footer/Footer";
import { AlertProvider } from "./Alerts/AlertProvider";
import "./App.css";

export const UserContext = createContext();

function App() {
  const {
    isAuthenticated,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
    user,
    isLoading,
    error,
  } = useAuth0();

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (error) {
    // Handle error state
    return <div>Error: {error.message}</div>;
  }

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthenticated,
        loginWithRedirect,
        getAccessTokenSilently,
        logout,
        isLoading,
      }}
    >
      <Router>
        <div className="relative z-0 h-100vh">
          <Navbar />
          <RoutesConfig isAuthenticated={isAuthenticated} user={user} getAccessTokenSilently={getAccessTokenSilently}/>
          <Footer />
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default function WrapperApp() {
  return (
    <Suspense fallback={<LoadingIndicator />}>
      <AlertProvider>
        <App />
      </AlertProvider>
    </Suspense>
  );
}
