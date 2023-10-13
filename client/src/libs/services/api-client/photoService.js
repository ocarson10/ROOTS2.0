import { instance } from './apiClient';
import { addLogs } from './logsService';

export async function getPhotos(geneticId) {
	const photos = await instance.get("photos/" + geneticId);
	return photos;
}

export async function addPhoto(geneticId, photoData) {
	const reader = new FileReader();
	reader.onload = function (event) {
	  const base64PhotoData = event.target.result;
	  console.log('Photo content:', base64PhotoData);
	  const requestData = {
		geneticId: geneticId,
		photoData: base64PhotoData,
	  };
  
	  addLogs("Added photo with genetic id: " + geneticId);
  
	  // Send the JSON data to the server
	  return instance.post("photos", requestData)
		.then(response => {
		  console.log('Image uploaded:', response.data);
		})
		.catch(error => {
		  console.error('Error uploading image:', error);
		});
	};
  
	// Read the file as a data URI
	reader.readAsDataURL(photoData);
  }

export async function deletePhoto(photoId) {
	await addLogs("Deleted photo with id: " + photoId);
	return await instance.delete(`photos/${photoId}`);
}
