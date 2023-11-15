import { useEffect, useCallback } from "react";
import PropTypes from "prop-types";

const AccessControl = ({ isAuthenticated, roles, isLoaded, setIsLoaded, onAuthorized }) => {
  const hasAccess = useCallback(() => {
    if (isAuthenticated && roles.includes(import.meta.env.VITE_APP_PAGE_ACCESS)) {
      onAuthorized(true);
    }
  }, [isAuthenticated, roles, onAuthorized]);

  useEffect(() => {
    if (isAuthenticated && !isLoaded) {
      hasAccess();
      setIsLoaded(true);
    }
  }, [isAuthenticated, isLoaded, setIsLoaded, hasAccess]);

  return null; // This component doesn't render anything
};

AccessControl.propTypes = {
  isAuthenticated: PropTypes.bool,
  roles: PropTypes.array,
  isLoaded: PropTypes.bool,
  setIsLoaded: PropTypes.func,
  onAuthorized: PropTypes.func,
};

export default AccessControl;
