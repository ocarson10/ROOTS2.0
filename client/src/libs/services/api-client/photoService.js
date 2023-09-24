import { instance } from './apiClient';
import { addLogs } from './logsService';

export async function getPhotos(geneticId) {
	const photos = await instance.get("photos/" + geneticId);
	return photos;
}

export async function addPhoto(geneticId, photoData) {
	addLogs("Added photo with genetic id: " + geneticId);
	return await instance.post("photo", {
		materialGeneticId: geneticId,
		photoData: photoData
	});
}