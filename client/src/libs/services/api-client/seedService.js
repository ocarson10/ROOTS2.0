import {instance} from './apiClient';
import { getSingleId } from './idService';
import {addLogs} from './logsService';

// Returns the seed materials in the database
export async function getSeeds() {
  const seeds = await instance.get("seeds");
  return seeds;
}

//Return single seed by id
export async function getSeed(seedId) {
  const seed = await instance.get("seeds/" + seedId);
  return seed;
}

// Add a new seed material to the database given a mother tree id, a father tree id, a progeny id,
// geentic id, origin, quantityt, dateMade, location, active
export async function addSeed(seedId, motherId, coneId, fatherTreeId, geneticId, 
  familyId, progenyId, population, ramet,  origin, quantity, dateMade, location, expectedTransferDate) {
    const response = await getSingleId(geneticId, familyId, progenyId, population, ramet);
    await addLogs("Added seed with id: " + seedId);
    console.log("Added seed with id: " + seedId);

    return await instance.post("seeds", {
    id: seedId,
    motherTreeId: motherId ? motherId : null,
    coneId: coneId ? coneId : null,
    fatherTreeId: fatherTreeId ? fatherTreeId : null,
    seedGeneticId: response.data.id,
    origin: origin,
    quantity: quantity,
    dateMade: dateMade,
    transferDate: transferDate,
    locationId: location,
    active: true,
    transferDate: expectedTransferDate
  });
}

// Update a seed material via a put request
export async function editSeed(seedId, motherId, coneId, fatherTreeId, geneticId, 
  familyId, progenyId, population, ramet,  origin, quantity, dateMade, location, active, expectedTransferDate) {
  const response = await getSingleId(geneticId, familyId, progenyId, population, ramet);

  await addLogs("Updated seed with id: " + seedId);
  return await instance.put(`seeds/edit/${seedId}`, {
    motherTreeId: motherId, 
    fatherTreeId: fatherTreeId,
    coneId: coneId,
    seedGeneticId: response.data.id,
    origin: origin,
    quantity: quantity,
    dateMade: dateMade,
    transferDate: transferDate,
    locationId: location,
    active: active,
    transferDate: expectedTransferDate
  });
}

// Archive a seed material via a put request
export async function removeSeed(seedId) {
  await addLogs("Archived seed with id: " + seedId);
  await instance.put("seeds/" + seedId);
}