import {instance} from './apiClient';
import {addLogs} from './logsService';
// Get the populations from the database
export async function getPopulations() {
  const populations = await instance.get("populations");
  return populations;
}

// Add a new population to the database
export async function addPopulation(population) {
  await addLogs(`Added population with id: ${population}`);
  return await instance.post("populations", {
    id: population
  });
}