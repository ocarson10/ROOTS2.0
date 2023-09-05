import {instance} from './apiClient';

// Get all the trees in the mother tree table from the database
export async function getMotherTrees() {
  const motherTrees = await instance.get("motherTrees");
  return motherTrees;
}

// Add a tree to the mother tree table given a tree id, the species, the location, and the gps coordinates
export async function addMotherTree(treeId, newSpecies, newLocation, newGPS) {
  instance.post("motherTrees", {
    id: treeId,
    species: newSpecies,
    location: newLocation,
    gps: newGPS
  });
}

// TODO: Add the rest of the CRUD operations for mother trees
