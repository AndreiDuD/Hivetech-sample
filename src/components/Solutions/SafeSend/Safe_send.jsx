import { useContext, useEffect, useState } from 'react';
import { AlertContext } from '../../../Alerts/AlertProvider';
import Calendar from './Calendar/calendar.jsx';
import ClientSelect from './Client/client_select.jsx';
import { handleParse } from './FileUpload/Functions/file_send_function';
import FileUploadSection from './FileUpload/upload_section.jsx';

function SafeSend() {
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [file, setFile] = useState(null);
  const [fileType, setFileType] = useState('');
  const [buttonColor, setButtonColor] = useState('');
  const [errorMessage, setErrorMessage] = useState([]);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [isCheckingFile, setIsCheckingFile] = useState(false);
  const { showAlert } = useContext(AlertContext);

  useEffect(() => {
    setFile(null); // Set the file state to null when changing clients
    setErrorMessage([]);
    setFileType('');
  }, [selectedClient, selectedDate]);

  const handleShowAlert = () => {
    if (showSuccessAlert === true) {
      setShowSuccessAlert(false);
      showAlert('success', 'File uploaded successfully!', 5000);
    }
  };

  const handleClientChange = (client) => {
    if (typeof client === 'string') {
      // If a string is passed (deselection), deselect the client
      setSelectedClient('');
    } else {
      // Otherwise, select the clicked client
      setSelectedClient(client.name);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleUpload = (uploadedFile) => {
    setFile(uploadedFile);
  };

  const handleDelete = () => {
    setFile(null);
    setErrorMessage([]);
  };

  const handleParseFile = async () => {
    if (selectedClient) {
      await handleParse(file, fileType, selectedClient, selectedDate, setErrorMessage, setShowSuccessAlert);
      handleShowAlert();
      setIsCheckingFile(false);
      setFile(null);
    }
  };
  const handleFileTypeChange = (event) => {
    const selectedFileType = event.target.value;
    setFileType(selectedFileType);
    setFile(null);

    // Set button color based on selected file type
    if (selectedFileType === 'xlsx') {
      setButtonColor('bg-green-500');
    } else if (selectedFileType === 'docx') {
      setButtonColor('bg-blue-500');
    } else {
      setButtonColor('');
    }
  };

  const renderMainContent = () => {
    if (!selectedClient) {
      return (
        <>
          <div className='flex flex-col items-center justify-center'>
            <h1 className='mb-20 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl lg:text-6xl'>
              Secure <mark className='px-2 text-white bg-cyan-600 rounded dark:bg-blue-500'>Transmit</mark>
            </h1>
            <p className='text-lg font-normal text-gray-300 lg:text-xl dark:text-gray-400'>
              Choose a client to get started
            </p>
          </div>
          <div className='w-1/4 mr-5'>{/* Empty div so the title remains in the center */}</div>
        </>
      );
    }

    return (
      <>
        <FileUploadSection
          file={file}
          fileType={fileType}
          setFileType={setFileType}
          buttonColor={buttonColor}
          handleUpload={handleUpload}
          handleDelete={handleDelete}
          handleParseFile={handleParseFile}
          selectedClient={selectedClient}
          selectedDate={selectedDate}
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          isCheckingFile={isCheckingFile}
          setIsCheckingFile={setIsCheckingFile}
          handleFileTypeChange={handleFileTypeChange}
        />

        <Calendar client={selectedClient} handleDateChange={handleDateChange} setFileType={setFileType} />
      </>
    );
  };

  return (
    <div className='flex items-top justify-between mt-10 mb-20'>
      <ClientSelect selectedClient={selectedClient} handleClientChange={handleClientChange} />
      {renderMainContent()}
    </div>
  );
}

export default SafeSend;
