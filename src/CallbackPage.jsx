import { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingIndicator from "./page-loader/PageLoader";
import { useNavigate } from "react-router-dom";

const CallbackPage = () => {
  const { isLoading, error, isAuthenticated, loginWithRedirect } = useAuth0();
  const navigate = useNavigate();

  useEffect(() => {
    const handleRedirect = async () => {
      if (!isLoading && !error && isAuthenticated) {
        // Redirect to the homepage
        navigate("/");
      } else if (!isLoading && !error && !isAuthenticated) {
        // Perform the login redirection
        await loginWithRedirect();
      }
    };

    handleRedirect();
  }, [isLoading, error, isAuthenticated, loginWithRedirect, navigate]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return null;
};

export default CallbackPage;
