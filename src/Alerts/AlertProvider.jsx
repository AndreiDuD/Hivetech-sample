import React, { createContext, useState } from "react";
import PropTypes from "prop-types";
import AlertComponent from "./AlertComponent";
import { CheckBadgeIcon, ExclamationTriangleIcon, XCircleIcon } from "@heroicons/react/24/solid";

export const AlertContext = createContext();

const alertTypeToIcon = {
  success: <CheckBadgeIcon className="h-6 w-6" />,
  warning: <ExclamationTriangleIcon className="h-6 w-6" />,
  error: <XCircleIcon className="h-6 w-6" />,
  default: <XCircleIcon className="h-6 w-6" />,
};

export const AlertProvider = ({ children }) => {
  const [alerts, setAlerts] = useState([]);

  const showAlert = (type, message, duration = 5000) => {
    const id = Date.now();
    const alert = { id, type, message };

    if (alerts.length >= 3) {
      setAlerts((prevAlerts) => prevAlerts.slice(1)); // Remove the oldest alert
    }
    
    setAlerts((prevAlerts) => [...prevAlerts, alert]);

    if (duration > 0) {
      setTimeout(() => {
        hideAlert(id);
      }, duration);
    }
  };

  const hideAlert = (id) => {
    setAlerts((prevAlerts) => prevAlerts.filter((alert) => alert.id !== id));
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <div className="fixed top-0 left-0 right-0 flex flex-col items-center justify-center z-50">
        {alerts.map((alert) => (
          <AlertComponent
            key={alert.id}
            type={alert.type}
            icon={alertTypeToIcon[alert.type]}
            message={alert.message}
            onClose={() => hideAlert(alert.id)}
          />
        ))}
      </div>
    </AlertContext.Provider>
  );
};

AlertProvider.propTypes = {
  children: PropTypes.node.isRequired,
};