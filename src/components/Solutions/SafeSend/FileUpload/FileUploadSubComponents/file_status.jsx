import LoadingData from "../../Loader/loading_data";
import PropTypes from "prop-types";

function FileStatus({ isLoading, fileExists }) {
  return (
<td className=" px-2 py-1">
      {isLoading ? (
        <LoadingData />
      ) : (
        <p
          className={`px-4 py-3 leading-normal text-${
            fileExists ? "blue-500 bg-blue-100" : "red-700 bg-red-100"
          } rounded-lg`}
        >
          {fileExists ? "Data found" : "No data found"}
        </p>
      )}
</td>
  );
}

FileStatus.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  fileExists: PropTypes.bool.isRequired,
};

export default FileStatus;