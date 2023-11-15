import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import FileActions from './FileUploadSubComponents/file_actions.jsx';
import FileStatus from './FileUploadSubComponents/file_status.jsx';
import FileTypeSelector from './FileUploadSubComponents/file_type_selector.jsx';
import { checkFileExists } from './Functions/check_file_exists.js';

function FileUploadSection({
  file,
  fileType,
  setFileType,
  buttonColor,
  handleUpload,
  handleDelete,
  handleParseFile,
  selectedClient,
  selectedDate,
  errorMessage,
  setErrorMessage,
  isCheckingFile,
  setIsCheckingFile,
  handleFileTypeChange,
}) {
  const [fileExists, setFileExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  const handleDownload = () => {
    let fileUrl = '';
    let fileName = '';

    if (fileType === 'xlsx') {
      fileUrl = 'src/assets/TB.xlsx';
      fileName = 'TB template.xlsx';
    } else if (fileType === 'docx') {
      fileUrl = 'src/assets/GL.docx';
      fileName = 'GL template.docx';
    } else {
      // Handle other file types or provide a default
      return;
    }

    // Create a virtual anchor element
    const downloadLink = document.createElement('a');
    downloadLink.href = fileUrl;
    downloadLink.download = fileName;

    // Trigger the click event to start the download
    downloadLink.click();
  };

  const checkFile = async () => {
    const exists = await checkFileExists(selectedClient, selectedDate, file);
    setFileExists(exists);
    setIsLoading(false);
  };

  useEffect(() => {
    if (file) {
      checkFile();
    }
  }, [file]);

  const handleCancelWarning = () => {
    setShowWarning(false);
  };

  const handleContinueWarning = async () => {
    setIsLoading(true);
    setIsCheckingFile(true);
    setShowWarning(false);
    handleParseFile();
    setTimeout(async () => {
      await checkFile();
    }, 3000); // Delay for 3 seconds
  };

  const handleClickSendFile = async () => {
    if (fileExists) {
      setShowWarning(true);
    } else {
      setIsLoading(true);
      setIsCheckingFile(true);
      await handleParseFile();
      setTimeout(async () => {
        await checkFile();
      }, 3000); // Delay for 3 seconds
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h1 className='mb-20 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl dark:text-white'>
        Secure <mark className='px-2 text-white bg-cyan-600 rounded dark:bg-blue-500'>Transmit</mark>
      </h1>
      <table className='table-auto'>
        <thead>
          <tr>
            <th className='px-6 py-2'>Date</th>
            <th className='px-6 py-2'>Current file</th>
            <th className='px-6 py-2'>Select file type</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className='px-6 min-w-[140px]'>{selectedDate ? selectedDate : 'No date selected'}</td>
            {file ? (
              <FileStatus isLoading={isLoading} fileExists={fileExists} />
            ) : (
              <td className='px-6'>
                <p className='leading-normal text-gray-200'>No file selected</p>
              </td>
            )}
            <FileTypeSelector fileType={fileType} handleFileTypeChange={handleFileTypeChange} />
          </tr>
        </tbody>
      </table>
      <FileActions
        file={file}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        fileType={fileType}
        handleUpload={handleUpload}
        handleDelete={handleDelete}
        handleClickSendFile={handleClickSendFile}
        buttonColor={buttonColor}
        handleDownload={handleDownload}
        handleCancelWarning={handleCancelWarning}
        handleContinueWarning={handleContinueWarning}
        showWarning={showWarning}
        isCheckingFile={isCheckingFile}
      />
    </div>
  );
}

FileUploadSection.propTypes = {
  selectedDate: PropTypes.string,
  file: PropTypes.object,
  fileType: PropTypes.string,
  setFileType: PropTypes.func.isRequired,
  handleUpload: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleParseFile: PropTypes.func.isRequired,
  selectedClient: PropTypes.string,
  errorMessage: PropTypes.arrayOf(PropTypes.string),
  setErrorMessage: PropTypes.func.isRequired,
  isCheckingFile: PropTypes.bool.isRequired,
  setIsCheckingFile: PropTypes.func.isRequired,
};

export default FileUploadSection;
