import { useState, useEffect } from "react";
import CalendarHeader from "./calendarHead";
import CalendarGrid from "./calendarGrid";
import { getDaysInMonth, getDate } from "date-fns";
import NotificationsSection from "../TaskAssigned/task-notification";
import PropTypes from "prop-types";

function Calendar({ client, handleDateChange, setFileType }) {
  const currentDate = new Date();
  const currentDay = getDate(currentDate);
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const [clickedDay, setClickedDay] = useState(null);
  const [ hasSelectedTask, setHasSelectedTask ] = useState({})
  const [selectedDate, setSelectedDate] = useState(
    `${currentDay}-${currentMonth + 1}-${currentYear}`
  );

  useEffect(() => {
    // Update the selected date whenever currentMonth or currentYear changes
    const newSelectedDate = `${currentDay}-${currentMonth + 1}-${currentYear}`;
    setSelectedDate(newSelectedDate);
    handleDateChange(newSelectedDate);
  }, [currentMonth, currentYear]);

  const handleDayChange = (day) => {
    if (day !== null) {
      const newSelectedDate = `${day}-${currentMonth + 1}-${currentYear}`;
      setSelectedDate(newSelectedDate);
      handleDateChange(newSelectedDate);
    }
  };

  const updateDaysArray = () => {
    const daysInMonth = getDaysInMonth(new Date(currentYear, currentMonth));
    const daysArray = Array.from(
      { length: daysInMonth },
      (_, index) => index + 1
    );
    return daysArray;
  };

  const days = updateDaysArray();

  const goToPreviousMonth = () => {
    const updatedMonth = currentMonth - 1;

    if (updatedMonth < 0) {
      setCurrentYear((prevYear) => prevYear - 1);
      setCurrentMonth(11);
    } else {
      setCurrentMonth(updatedMonth);
    }
  };

  const goToNextMonth = () => {
    const updatedMonth = currentMonth + 1;

    if (updatedMonth > 11) {
      setCurrentYear((prevYear) => prevYear + 1);
      setCurrentMonth(0);
    } else {
      setCurrentMonth(updatedMonth);
    }
  };

  const isCurrentMonth =
    currentMonth === currentDate.getMonth() &&
    currentYear === currentDate.getFullYear();
  const isSixMonthsPrior = currentMonth === currentDate.getMonth() - 6;
  return (
    <div className="w-1/4 mr-5">
      <div className="bg-gray-200 rounded-xl">
        <div className="container mx-auto ">
          <div className="wrapper bg-white rounded-xl shadow">
            <CalendarHeader
              currentMonth={currentMonth}
              currentYear={currentYear}
              goToPreviousMonth={goToPreviousMonth}
              goToNextMonth={goToNextMonth}
              isCurrentMonth={isCurrentMonth}
              isSixMonthsPrior={isSixMonthsPrior}
            />
            <div className="inline-block min-w-full">
              <CalendarGrid
                client={client}
                clickedDay={clickedDay}
                setClickedDay={setClickedDay}
                days={days}
                today={currentDay}
                thisMonth={currentMonth}
                thisYear={currentYear}
                handleDayChange={handleDayChange}
                setHasSelectedTask={setHasSelectedTask}
              />
            </div>
          </div>
        </div>
      </div>
      {Object.keys(hasSelectedTask).length !== 0 ? (
        <NotificationsSection hasSelectedTask={hasSelectedTask} setHasSelectedTask={setHasSelectedTask} currentDate={currentDate} selectedDate={selectedDate} setClickedDay={setClickedDay} setFileType={setFileType}/>
      ) : (
        <div
          className="flex mt-2 p-4 mb-4 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <svg
            aria-hidden="true"
            className="flex-shrink-0 inline w-5 h-5 mr-3"
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
          <span className="sr-only">Info</span>
          <div>
            <span className="font-medium">Info! </span>
            Click on one of the days to view assigned task:
            <ul className="font-medium mt-1.5 list-disc list-inside">
              <li className="text-red-500">BDO task</li>
              <li className="text-blue-500">Hivetech task</li>
              <li className="text-green-500">Payroll task</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
Calendar.propTypes = {
  client: PropTypes.string.isRequired,
  handleDateChange: PropTypes.func.isRequired,
};
export default Calendar;
