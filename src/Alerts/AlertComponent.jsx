import React from "react";
import PropTypes from "prop-types";
import { Alert, Button } from "@material-tailwind/react";

const alertTypeToColor = {
    success: "green",
    warning: "yellow",
    error: "red",
    default: "gray",
  };

const AlertComponent = ({ type, icon, message, onClose }) => (
  <div className={`mt-2 w-[50%] bg-${alertTypeToColor[type]}-500 rounded-lg`}>
    <Alert
      variant="gradient"
      icon={icon}
      action={
        <Button
          variant="text"
          color="white"
          size="sm"
          className="!absolute top-3 right-3"
          onClick={onClose}
        >
          Close
        </Button>
      }
    >
      {message}
    </Alert>
  </div>
);

AlertComponent.propTypes = {
  type: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default AlertComponent;
