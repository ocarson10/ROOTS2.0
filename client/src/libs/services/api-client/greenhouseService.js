import {instance} from './apiClient';
import {addLogs} from './logsService';
// Get all materials in the greenhouse table from the database
export async function getGreenhouses() {
  const greenhouses = await instance.get("greenhouses");
  return greenhouses;
}

export async function getGreenhouse(id) {
  const greenhouse = await instance.get("greenhouses/" + id);
  return greenhouse;
}

// Update a material in the greenhouse table via a put request
export async function updateGreenhouse(greenhouseId, greenhouseGeneticId, dateGreenhouse, location, active) {
  addLogs(`Updated greenhouse with id: ${greenhouseId}`);
    return await instance.put("greenhouses/update/" + greenhouseId, {
      greenhouseId: greenhouseId,
      greenhouseGeneticId: greenhouseGeneticId,
      dateGreenhouse: dateGreenhouse,
      locationId: location,
      active: active
    });
  }

// Add a material to the greenhouse table given a previous id, the date added to the greenhouse, the location,
// and whether or not it's active
export async function addGreenhouse(greenhouseId, greenhouseGeneticId, dateGreenhouse, location, active) {
  addLogs(`Added greenhouse with id: ${greenhouseId}`);
  return await instance.post("greenhouses", {
    greenhouseId: greenhouseId,
    greenhouseGeneticId: greenhouseGeneticId,
    dateGreenhouse: dateGreenhouse,
    locationId: location,
    active: active
  });
}

export async function removeGreenhouse(greenhouseId) {
  await addLogs(`Archived greenhouse with id: ${greenhouseId}`);
  return await instance.put("greenhouses/" + greenhouseId);
}