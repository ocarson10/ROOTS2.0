import {instance} from './apiClient';
import {addLogs} from './logsService';
// Get all the species in the database
export async function getSpecies() {
  const species = await instance.get("species");
  return species;
}

//get species by speciesName
export async function getSpeciesByName(speciesName) {
  const species = await instance.get(`species/${speciesName}`);
  return species;
}

// Add a new species given it's name and the shorthand abbreviation
export async function addSpecies(speciesName, speciesShorthand) {
  await addLogs(`Added species with name: ${speciesName}`);
  return await instance.post("species", {
    species: speciesName,
    shorthand: speciesShorthand
  });
}

  // Update species given it's name and the shorthand abbreviation
export async function updateSpecies(speciesName, speciesShorthand, currentSpeciesName) {
  await addLogs(`Updating species with name: ${speciesName}`);
  return await instance.put("species", {
    currentSpeciesName: currentSpeciesName,
    species: speciesName,
    shorthand: speciesShorthand
  });
}