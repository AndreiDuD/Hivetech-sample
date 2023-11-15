import PropTypes from "prop-types";

const Errors = ({ errorMessage, setErrorMessage }) => {
  const [filename, ...missingValues] = errorMessage;
  const handleClose = () => {
    setErrorMessage([]);
  };

  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
      <div className="flex justify-between mb-2">
        <div>
          <strong className="font-bold">Parse error: </strong>
          <span className="inline">{filename}</span>
        </div>
        <button
          className="flex-none p-1 ml-2 focus:outline-none"
          onClick={handleClose}
        >
          <svg
            className="fill-current h-4 w-4 text-red-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path
              fillRule="evenodd"
              d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.03a1.2 1.2 0 0 1-1.697 0L3.47 13.02a1.2 1.2 0 0 1 0-1.697L6.5 10 3.47 7.348a1.2 1.2 0 0 1 0-1.697l1.201-1.201a1.2 1.2 0 0 1 1.697 0L10 8.181l2.651-3.03a1.2 1.2 0 0 1 1.697 0l1.201 1.201a1.2 1.2 0 0 1 0 1.697L13.5 10l2.032 2.651a1.2 1.2 0 0 1 0 1.697z"
            />
          </svg>
        </button>
      </div>
      {missingValues.map((error, index) => (
        <div key={index} className="mb-2">
          <strong className="font-bold">Error: </strong>
          <span className="inline">{error}</span>
        </div>
      ))}
    </div>
  );
};

Errors.propTypes = {
  errorMessage: PropTypes.arrayOf(PropTypes.string),
  setErrorMessage: PropTypes.func.isRequired,
};

export default Errors;
