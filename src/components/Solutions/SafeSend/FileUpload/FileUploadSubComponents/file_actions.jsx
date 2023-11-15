import PropTypes from "prop-types";
import ErrorMessages from "./errors";
import Dropzone from "../dropzone.jsx";
import WarningBox from "../../warning.jsx";
import CheckingFileLoader from './CheckFileLoader/loader_file'

function FileActions({
  file,
  errorMessage,
  setErrorMessage,
  fileType,
  handleUpload,
  handleDelete,
  handleClickSendFile,
  buttonColor,
  handleDownload,
  handleCancelWarning,
  handleContinueWarning,
  showWarning,
  isCheckingFile,
}) {
  return (
    <div className="flex items-center justify-between mt-5">
      {file ? (
        <>
          <span className="text-2xl ">Selected file: {file.name}</span>
          <button
            onClick={handleDelete}
            className="ml-4 px-3 py-1 text-white bg-red-500 rounded hover:bg-red-600 focus:outline-none focus:shadow-outline"
          >
            Delete
          </button>
          <button
            onClick={handleClickSendFile}
            className="ml-4 px-3 py-1 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
          >
            Send File
          </button>
        </>
      ) : errorMessage.length > 0 ? (
        <ErrorMessages
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
        />
      ) : fileType !== "" ? ( 
        isCheckingFile ? (<CheckingFileLoader />) : (<div className="flex items-center">
          <Dropzone handleUpload={handleUpload} fileType={fileType}/>
          <button
            className={`align-center rounded-lg py-10 ml-2 ${buttonColor}`}
            onClick={handleDownload}
          >
            Download Template
          </button>
        </div>)
        
      ) : (
        <p className="mt-8 text-lg font-normal text-gray-300 lg:text-xl dark:text-gray-400">
          Choose a file type
        </p>
      )}

      {showWarning && (
        <WarningBox
          onCancel={handleCancelWarning}
          onContinue={handleContinueWarning}
        />
      )}
    </div>
  );
}

FileActions.propTypes = {
    file: PropTypes.object,
    errorMessage: PropTypes.arrayOf(PropTypes.string),
    setErrorMessage: PropTypes.func.isRequired,
    fileType: PropTypes.string,
    handleUpload: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleClickSendFile: PropTypes.func.isRequired,
    buttonColor: PropTypes.string,
    handleDownload: PropTypes.func.isRequired,
    handleCancelWarning: PropTypes.func.isRequired,
    handleContinueWarning: PropTypes.func.isRequired,
    showWarning: PropTypes.bool.isRequired,
    isCheckingFile: PropTypes.bool.isRequired,
  };

export default FileActions;