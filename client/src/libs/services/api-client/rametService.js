import {instance} from './apiClient';
import { getSingleId } from './idService';
import {addLogs} from './logsService';

// Get the ramets from the database
export async function getRamets() {
  const ramets = await instance.get("ramets");
  return ramets;
}

// Add a ramet to the database given a mother tree id, the progeny id, the genetic id, the location, the gps
// coordinates, and whether or not it's active
export async function addRamet(id, motherTreeId, geneticId, familyId, progenyId, populationId, rametId, location, gps) {
  const response =  await getSingleId(geneticId, familyId, progenyId, populationId, rametId);
  await addLogs("Added ramet with id: " + id);
  return await instance.post("ramets", {
    id: id,
    motherTreeId: motherTreeId,
    locationId: location,
    rametGeneticId: response.data.id,
    gps: gps,
    active: true
  });
}

// Update a ramet via a put request
export async function updateRamet(id, motherTreeId, progenyId, geneticId, location, gps, active) {
  await addLogs("Updated ramet with id: " + id);
  return await instance.put(`ramets/${id}`, {
    motherTreeId: motherTreeId,
    location: location,
    progenyId: progenyId,
    geneticId: geneticId,
    gps: gps,
    active: active
  });
}