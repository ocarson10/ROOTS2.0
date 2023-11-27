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
export async function addSpecies(speciesName, speciesShorthand, active) {
  await addLogs(`Added species with name: ${speciesName}`);
  return await instance.post("species", {
    species: speciesName,
    shorthand: speciesShorthand,
    active: active,
  });
}

//Archive species
export async function removeSpecies(species) {
  await addLogs("Archived species with name: " + species);
  await instance.put("species/" + species);
}

// Update species shorthand given its name and the shorthand abbreviation
export async function updateSpecies(speciesName, speciesShorthand) { 
  await addLogs(`Updating species with name: ${speciesName}`);

  return await instance.put("species/edit/" + speciesName, {
    species: speciesName,
    shorthand: speciesShorthand,
    active: true
  });
}