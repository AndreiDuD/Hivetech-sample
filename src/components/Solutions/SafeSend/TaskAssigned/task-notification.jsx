import { getDate } from "date-fns";
import { AlertContext } from "../../../../Alerts/AlertProvider";
import { useContext } from "react";

function AssignedTaskView({ hasSelectedTask, setHasSelectedTask, currentDate, selectedDate, setClickedDay, setFileType}) {
  const { showAlert } = useContext(AlertContext);

  // Your code for rendering notifications and handling messages
  const closeNotification = () => {
    setClickedDay(null)
    setHasSelectedTask({})
    setFileType('')
  }
  const currentDay = getDate(currentDate);
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentDateFormatted = `${currentDay}-${currentMonth + 1}-${currentYear}`
  const currentDateFormat = new Date(currentDateFormatted.split('-').reverse().join('-'));
  const selectedDateFormat = new Date(selectedDate.split('-').reverse().join('-'));
  const startTask = () => {
    // Check if selectedDate is greater than or equal to currentDate
    if (currentDateFormat <= selectedDateFormat) {
      setFileType('xlsx');
    } else {
      // Display an error message or take appropriate action
      showAlert("error", "Task date is overdue!", 5000);
    }
  };

  const classMappings = {
    bdo: {
      text: "text-red-800",
      bg: "bg-red-50",
      border: "border-red-300",
      buttonBg: "bg-red-800",
      buttonHover: "hover:bg-red-900",
      buttonRing: "focus:ring-red-200",
    },
    hivetech: {
      text: "text-blue-800",
      bg: "bg-blue-50",
      border: "border-blue-300",
      buttonBg: "bg-blue-800",
      buttonHover: "hover:bg-blue-900",
      buttonRing: "focus:ring-blue-200",
    },
    payroll: {
      text: "text-green-800",
      bg: "bg-green-50",
      border: "border-green-300",
      buttonBg: "bg-green-800",
      buttonHover: "hover:bg-green-900",
      buttonRing: "focus:ring-green-200",
    },
    // Add more mappings for other types if needed
  };
  // Determine the classes based on the task type, default to gray if not found
  const classes = classMappings[hasSelectedTask.type] || {
    text: "text-gray-800",
    bg: "bg-gray-50",
    border: "border-gray-300",
    buttonBg: "bg-gray-800",
    buttonHover: "hover:bg-gray-900",
    buttonRing: "focus:ring-gray-200",
  };
  return (
    <>
      <div
        id="alert-additional-content-1"
        className={`p-4 mt-2 mb-4 ${classes.text} border ${classes.border} rounded-lg ${classes.bg}`}
        role="alert"
      >
        <div className="flex items-center">
          <svg
            aria-hidden="true"
            className="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Task</span>
          <h3 className="text-lg font-medium uppercase">{hasSelectedTask.type} task assigned</h3>
        </div>
        <div className="mt-2 mb-4 text-sm">{hasSelectedTask.description}</div>
        <div className="flex">
          <button
            type="button"
            onClick={() => startTask()}
            className={`text-white ${classes.button} ${classes.buttonBg} ${classes.buttonHover} focus:ring-4 focus:outline-none ${classes.buttonRing} font-medium rounded-lg text-xs px-3 py-1.5 mr-2 text-center inline-flex items-center`}
          >
            <svg
              aria-hidden="true"
              className="-ml-0.5 mr-2 h-4 w-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
              <path
                fillRule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clipRule="evenodd"
              ></path>
            </svg>
            Start task
          </button>
          <button
            type="button"
            onClick={() => closeNotification()}
            className={`${classes.text} bg-transparent border ${classes.border} ${classes.buttonHover} hover:text-white focus:ring-4 focus:outline-none ${classes.buttonRing} font-medium rounded-lg text-xs px-3 py-1.5 text-center`}
            data-dismiss-target="#alert-additional-content-1"
            aria-label="Close"
          >
            Dismiss
          </button>
        </div>
      </div>
    </>
  );
}

export default AssignedTaskView;
