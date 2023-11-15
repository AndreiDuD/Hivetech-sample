import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";
import { check_TB_Completeness } from "../TB_check_complete";
import { checkCompleteness } from "../check_complete";
import * as openpgp from "openpgp";
import * as XLSX from "xlsx";

export const handleParse = async (
  file,
  fileType,
  selectedClient,
  selectedDate,
  setErrorMessage,
  setShowSuccessAlert
) => {
  try {
    // Read the file data
    const reader = new FileReader();
    reader.onload = async (event) => {
      const binaryData = new Uint8Array(event.target.result);
      // Parse XLSX file and get the sheet data
      const workbook = XLSX.read(binaryData, { type: "array" });

      if (fileType === 'xlsx') {
        // Check file completeness on TB
        const { isComplete, errorMessages } = check_TB_Completeness(workbook);
        
        if (!isComplete) {
          // Pass the incomplete cells to the SafeSend component
          const errorMessage = `File ${file.name} could not be parsed due to the following errors:`;
          setErrorMessage([errorMessage, ...errorMessages]);
          setShowSuccessAlert(false);
        }
        
        return { isComplete, errorMessages };
      } else if (fileType === 'docx') {
        // Check file completeness on GL
        const { isComplete, errorMessages } = checkCompleteness(workbook);
        
        if (!isComplete) {
          // Pass the incomplete cells to the SafeSend component
          const errorMessage = `File ${file.name} could not be parsed due to the following errors:`;
          setErrorMessage([errorMessage, ...errorMessages]);
          setShowSuccessAlert(false);
        }
        
        return { isComplete, errorMessages };
      }

      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const fileData = XLSX.utils.sheet_to_json(worksheet);

      // Convert file data to JSON string
      const fileDataJson = JSON.stringify(fileData);

      // Read the public key from the file
      const publicKeyArmored = import.meta.env.VITE_PUBLIC_KEY;
      const publicKey = await openpgp.readKey({
        armoredKey: publicKeyArmored,
      });

      // Encrypt file data using public key
      const encrypted = await openpgp.encrypt({
        message: await openpgp.createMessage({ text: fileDataJson }),
        encryptionKeys: publicKey,
      });

      // Upload the encrypted file to Azure Blob Storage
      const storageAccountName = "safesend";
      const containerName = "testing-safesend";
      // Change date to MM-YYYY so all files uploaded in a month-year will be in the same folder
      const parts = selectedDate.split('-');
      const monthYear = `${parts[1]}-${parts[2]}`;
      const clientDirectoryDate = monthYear;
      const blobName = `cfo-compass/${selectedClient}/${clientDirectoryDate}/${file.name}`;

      const defaultAzureCredential = new DefaultAzureCredential();
      const blobServiceClient = new BlobServiceClient(
        `https://${storageAccountName}.blob.core.windows.net`,defaultAzureCredential
      );
      const containerClient =
        blobServiceClient.getContainerClient(containerName);
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.uploadData(encrypted, {
        onProgress: (ev) => {
          // console.log(ev)
          setShowSuccessAlert(true)
        },
      });
    };
    
    reader.readAsArrayBuffer(file);
    
  } catch (error) {
    console.error(error);
  }
};
