import { BlobServiceClient } from "@azure/storage-blob";
import { DefaultAzureCredential } from "@azure/identity";

export const checkFileExists = async (selectedClient, selectedDate, file_name) => {
  try {
    const storageAccountName = "safesend";
    const containerName = "testing-safesend"; // Replace with your container name
    // Change date to MM-YYYY so all files uploaded in a month-year will be in the same folder
    const parts = selectedDate.split('-');
    const monthYear = `${parts[1]}-${parts[2]}`;
    const clientDirectoryDate = monthYear;
    const blobName = `cfo-compass/${selectedClient}/${clientDirectoryDate}/${file_name.name}`;

    // Create a BlobServiceClient with the DefaultAzureCredential
    const defaultAzureCredential = new DefaultAzureCredential();
    const blobServiceClient = new BlobServiceClient(`https://${storageAccountName}.blob.core.windows.net`, defaultAzureCredential);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(blobName);

    const response = await blobClient.exists();
    return response;
  } catch (error) {
    console.log(error);
    return false;
  }
};