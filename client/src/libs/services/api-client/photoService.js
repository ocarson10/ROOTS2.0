import { instance } from './apiClient';
import { addLogs } from './logsService';
import {getSingleId} from './idService';

export async function getPhotos(geneticId) {
	const photos = await instance.get("photos/" + geneticId);
	return photos;
}

export async function addPhoto(progenyId, geneticId, familyId, populationId, rametId, photoData) {
	addLogs("Added photo with genetic id: " + geneticId);
	const response = await getSingleId(geneticId, familyId, progenyId, populationId, rametId);
	return await instance.post("photos", {
		materialGeneticId: response.data.id,
		photoData: photoData
	});
}

export async function deletePhoto(photoId) {
	await addLogs("Deleted photo with id: " + photoId);
	return await instance.delete(`photos/${photoId}`);
}