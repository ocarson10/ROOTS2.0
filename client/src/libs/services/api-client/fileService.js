import { instance } from './apiClient';
import { addLogs } from './logsService';

export async function getFiles(geneticId) {
	const files = await instance.get("files/" + geneticId);
	return files;
}

export async function addFile(geneticId, fileData) {
	const reader = new FileReader();
	reader.onload = function (event) {
	  const base64FileData = event.target.result;
	  console.log('File content:', base64FileData);
	  const requestData = {
		geneticId: geneticId,
		fileData: base64FileData,
	  };
  
	  addLogs("Added file with genetic id: " + geneticId);
  
	  // Send the JSON data to the server
	  return instance.post("files", requestData)
		.then(response => {
		  console.log('File uploaded:', response.data);
		})
		.catch(error => {
		  console.error('Error uploading file:', error);
		});
	};
  
	// Read the file as a data URI
	//console.log(fileData);
	reader.readAsDataURL(fileData);
  }

export async function deleteFile(fileId) {
	await addLogs("Deleted file with id: " + fileId);
	return await instance.delete(`files/${fileId}`);
}
