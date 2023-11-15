import { useCallback, useContext } from "react";
import { useDropzone } from "react-dropzone";
import PropTypes from "prop-types";
import { AlertContext } from "../../../../Alerts/AlertProvider";

const FileUpload = ({ handleUpload, fileType }) => {
  const { showAlert } = useContext(AlertContext);
  const onDrop = useCallback(
    (acceptedFiles) => {
      // Define allowed file extensions based on fileType
      const allowedExtensions = {
        xlsx: [".xlsx", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"],
        docx: [".docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"],
        // Add more file types and their extensions as needed
      };

      // Filter files based on allowed extensions
      const allowedFiles = acceptedFiles.filter((file) =>
        allowedExtensions[fileType].some((extension) => file.name.endsWith(extension) || file.type === extension)
      );

      if (allowedFiles.length === 0) {
        // Show an error message if no allowed files are selected
        showAlert("error", `No ${fileType} file selected.`, 5000);
      } else {
        handleUpload(allowedFiles[0]); // Only handle the first allowed file uploaded
      }
    },
    [handleUpload, fileType]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false, // Only allow one file upload
  });

  return (
    <div
      {...getRootProps()}
      className="flex items-center justify-center w-full"
    >
      <div
        className={`flex flex-col items-center justify-center min-w-[350px] w-full h-20% border-2 border-gray-300 ${
          isDragActive ? "border-dashed" : "border-solid"
        } rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            aria-hidden="true"
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            ></path>
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          {...getInputProps()}
        />
      </div>
    </div>
  );
};

FileUpload.propTypes = {
  handleUpload: PropTypes.func.isRequired,
  fileType: PropTypes.string.isRequired,
};

export default FileUpload;
