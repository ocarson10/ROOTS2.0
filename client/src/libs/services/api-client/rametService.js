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
export async function addRamet(id, motherTreeId, geneticId, familyId, progenyId, populationId, rametId, location, gps, expectedTransferDate) {
  const response =  await getSingleId(geneticId, familyId, progenyId, populationId, rametId);
  await addLogs("Added ramet with id: " + id);
  return await instance.post("ramets", {
    id: id,
    motherTreeId: motherTreeId,
    locationId: location,
    rametGeneticId: response.data.id,
    gps: gps,
    transferDate: expectedTransferDate,
    active: true
  });
}

// Update a ramet via a put request
export async function updateRamet(
  id, 
  motherTreeId, 
  progenyId, 
  geneticId,
  familyId,
  rametId,
  population,
  location, 
  gps,
  expectedTransferDate,
  active
  ) {
  const response = await getSingleId(geneticId, familyId, progenyId, population, rametId);
  await addLogs("Updated ramet with id: " + id);
  return await instance.put("ramets/edit/" + id, {
    motherTreeId: motherTreeId,
    locationId: location,
    rametGeneticId: response.data.id,
    gps: gps,
    transferDate: expectedTransferDate,
    active: active
  });
}
