import { instance } from './apiClient';
import { addLogs } from './logsService';

export async function getPhotos(geneticId) {
	try {
	  const response = await instance.get("photos/" + geneticId);
	  const photosData = response.data;
  
	  if (photosData && photosData.length > 0) {
		// Iterate through the received photo data and decode each image
		const photoURLs = photosData.map(photoItem => {
			return {
				photoData: photoItem.photoData, 
				photoId: photoItem.photoId
			}
		});
  
		return photoURLs;
	  } else {
		// Handle the case where no photos were found for the geneticId
		return [];
	  }
	} catch (error) {
	  console.error('Error fetching photos:', error);
	  throw error; // You may want to handle the error differently
	}
  }

export async function addPhoto(geneticId, photoData) {
	const reader = new FileReader();
	reader.onload = function (event) {
		const base64PhotoData = event.target.result;

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
