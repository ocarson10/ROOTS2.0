import {instance} from './apiClient';
import {addLogs} from './logsService';

// Get all embryos in cold treatment from the database
export async function getColdTreatments() {
  const treatments = await instance.get("coldtreatments");
  return treatments;
}

export async function getColdTreatment(id) {
  const treatment = await instance.get(`coldtreatments/${id}`);
  return treatment;
}

// Add a new object to the cold treatment table given an id, number of embryos, date added, duration, location
// and whether or not it's active
export async function addColdTreatment(coldtreatmentId, geneticId, numberEmbryos, dateCold, duration, transferDate, location, active) {
  addLogs("Added cold treatment with id: " + coldtreatmentId);
    return await instance.post("coldtreatments", {
      coldTreatmentId: coldtreatmentId,
      coldTreatmentGeneticId: geneticId,
      numberEmbryos: numberEmbryos,
      dateCold: dateCold,
      duration: duration,
      transferDate: transferDate,
      locationId: location,
      active: active
    });
  }

// Perform a post request to update an object in cold treatment
export async function updateColdTreatment(coldtreatmentId, geneticId, numberEmbryos, dateCold, duration, transferDate, location, active) {
  addLogs("Updated cold treatment with id: " + coldtreatmentId);
  return await instance.put("coldtreatments/update/" + coldtreatmentId, {
    coldTreatmentId: coldtreatmentId,
    coldTreatmentGeneticId: geneticId,
    numberEmbryos: numberEmbryos,
    dateCold: dateCold,
    duration: duration,
    transferDate: transferDate,
    locationId: location,
    active: active
  });
}

// Perform a put request to remove an object from cold treatment
export async function removeColdTreatment(coldtreatmentId) {
  addLogs("Archived cold treatment with id: " + coldtreatmentId);
  return await instance.put("coldtreatments/" + coldtreatmentId);
}