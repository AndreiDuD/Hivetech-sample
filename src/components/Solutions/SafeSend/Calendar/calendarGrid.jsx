import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { BellIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { UserContext } from "../../../../App.jsx";

function CalendarGrid({
  client,
  clickedDay,
  setClickedDay,
  days,
  today,
  thisMonth,
  thisYear,
  handleDayChange,
  setHasSelectedTask
}) {
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const { user } = useContext(UserContext);
  const clients = user.app_metadata?.Clients || [];
  const selectedClient = clients.find((c) => c.name === client);
  const tasks = selectedClient?.Tasks || [];

  // Calculate the offset for the first day of the month
  const firstDayOfMonth = new Date(
    new Date().getFullYear(),
    thisMonth,
    1
  ).getDay();

  // Create an array to represent the days of the month with proper spacing
  const paddedDays = [...Array(firstDayOfMonth).fill(null), ...days];

  const handleDayClick = (day) => {
    setClickedDay((prevClickedDay) => (prevClickedDay === day ? null : day));
    // Call the handleDayChange function to update selectedDate in the Calendar component
    handleDayChange(day);
  };

  useEffect(() => {
    // Reset the clickedDay state when the month or year changes
    setClickedDay(null);
  }, [thisMonth, thisYear]);

  // Function to check if a task exists on a specific day
  const hasTaskOnDay = (day, type) => {
    const formattedDate = `${thisYear}-${thisMonth + 1}-${day}`;
    return tasks.some(
      (task) => task["due-date"] === formattedDate && task.type === type
    );
  };

  const hasSelectedTaskDay = (day) => {
    const formattedDate = `${thisYear}-${thisMonth + 1}-${day}`;
    return tasks.some(
      (task) => task["due-date"] === formattedDate
    );
  };

  useEffect(() => {
    if (hasSelectedTaskDay(clickedDay)) {
      const formattedDate = `${thisYear}-${thisMonth + 1}-${clickedDay}`;
      const selectedTask = tasks.find(
        (task) => task["due-date"] === formattedDate
      );
  
      // Now you can use the selectedTask in your logic here
      if (selectedTask) {
        // Do something with the selected task
        setHasSelectedTask(selectedTask);
      } else {
        // No task found for the clicked day, set it to an empty object
        setHasSelectedTask({});
      }
    } else {
      // No task for the clicked day, set it to an empty object
      setHasSelectedTask({});
    }
  }, [clickedDay]);

  return (
    <table className="w-full">
      <thead>
        <tr>
          {dayNames.map((day, index) => (
            <th
              key={index}
              className={`border-r h-10 xl:w-40 lg:w-30 md:w-30 sm:w-20 w-10 xl:text-sm text-xs ${
                index === 0 || index === 6 ? "text-red-500" : "text-black"
              }`}
            >
              <span className="block">{day}</span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {paddedDays.map((day, index) => {
          if (index % 7 === 0) {
            // Start a new row
            return (
              <tr key={index} className="text-center h-10">
                {paddedDays.slice(index, index + 7).map((day, innerIndex) => (
                  <td
                    key={innerIndex}
                    className={`relative border p-1 h-15 xl:w-20 lg:w-20 md:w-20 sm:w-10 w-10 transition cursor-pointer ease hover:bg-gray-300 ${
                      day === today &&
                      currentMonth === thisMonth &&
                      currentYear === thisYear
                        ? "bg-blue-300 text-white"
                        : ""
                    } ${
                      day === clickedDay && day !== null
                        ? "bg-gray-400 hover:bg-gray-300"
                        : ""
                    } ${
                      innerIndex === 0 || innerIndex === 6
                        ? "text-red-400"
                        : "text-black" // Apply red color for Saturday and Sunday
                    }`}
                    onClick={() => handleDayClick(day)}
                  >
                    <div className="flex flex-col h-full w-full">
                      {day !== null && (
                        <div className="top h-5 w-full">
                          <span
                            className={`${
                              innerIndex === 0 || innerIndex === 6
                                ? "text-red-400"
                                : "text-gray-500" // Apply red color for Saturday and Sunday
                            }`}
                          >
                            {day}
                          </span>
                        </div>
                      )}
                      <div className="absolute -top-2 -right-1">
                        {/* Display colored dot if a task exists */}
                        {hasTaskOnDay(day, "hivetech") && (
                          <span className="animate-pulse inline-flex rounded-full h-3 w-3 bg-blue-700"></span>
                        )}
                        {hasTaskOnDay(day, "bdo") && (
                          <BellIcon className="h-6 w-6 text-red-700 animate-pulse" />
                        )}
                        {hasTaskOnDay(day, "payroll") && (
                          <BellIcon className="h-6 w-6 text-green-500 animate-pulse" />
                        )}
                      </div>
                    </div>
                  </td>
                ))}
              </tr>
            );
          }
          // For the remaining days, don't start a new row
          return null;
        })}
      </tbody>
    </table>
  );
}

CalendarGrid.propTypes = {
  days: PropTypes.array.isRequired,
  today: PropTypes.number.isRequired,
  thisMonth: PropTypes.number.isRequired,
  thisYear: PropTypes.number.isRequired,
};

export default CalendarGrid;
