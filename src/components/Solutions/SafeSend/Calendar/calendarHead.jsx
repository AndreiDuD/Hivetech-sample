import PropTypes from "prop-types";
import CalendarButtons from "./icon_buttons";
import { useState } from "react";
import InfoCard from "./calendar-info";

function CalendarHeader({
  currentMonth,
  currentYear,
  goToPreviousMonth,
  goToNextMonth,
  isCurrentMonth,
  isSixMonthsPrior
}) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [clickedInfo, setclickedInfo] = useState(false);
  
  const displayInfo = () => {
    setclickedInfo(!clickedInfo);
  };

  return (
    <div className="header flex justify-between border-b p-2">
      <span className="flex text-lg font-bold text-black">
        <svg
          aria-hidden="true"
          className="flex-shrink-0 inline w-6 h-6 mr-2 cursor-pointer animate-pulse"
          fill="blue"
          viewBox="0 0 20 20"
          onMouseEnter={() => displayInfo()}
          onMouseLeave={() => displayInfo()}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
            clipRule="evenodd"
          ></path>
        </svg>
        {clickedInfo ? <InfoCard /> : null}
        {months[currentMonth]} {currentYear}
      </span>

      <CalendarButtons
        onPreviousClick={goToPreviousMonth}
        onNextClick={goToNextMonth}
        showNextButton={!isCurrentMonth}
        showPreviousButton={!isSixMonthsPrior}
      />
    </div>
  );
}

CalendarHeader.propTypes = {
  currentMonth: PropTypes.number.isRequired,
  currentYear: PropTypes.number.isRequired,
  goToPreviousMonth: PropTypes.func.isRequired,
  goToNextMonth: PropTypes.func.isRequired,
  isCurrentMonth: PropTypes.bool.isRequired,
};

export default CalendarHeader;
