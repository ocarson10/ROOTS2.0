import {instance} from './apiClient';
import {getSingleId} from './idService';
import {addLogs} from './logsService';

// Get all the trees from the database 
export async function getTrees() {
  const trees = await instance.get("trees");
  return trees;
}


// Adds a tree to the database
export async function addTree(progenyId, geneticId, familyId, populationId, rametId, location, gps, active, treeId) {

  const response = await getSingleId(geneticId, familyId, progenyId, populationId, rametId);
  await addLogs("Added tree with id: " + treeId);
  return await instance.post("trees", {
    treeId: treeId,
    treeGeneticId: response.data.id,
    locationId: location,
    gps: gps,
    active: active
  });
}

//Archive tree
export async function removeTree(treeId) {
  await addLogs("Archived tree with id: " + treeId);
  await instance.put("trees/" + treeId);
}

//Return single tree by id
export async function getTree(treeId) {
  const tree = await instance.get("trees/" + treeId);
  return tree;
}

//Edit tree
export async function editTree(treeId, progenyId, geneticId, familyId, populationId, rametId, location, gps, active) {

  const response = await getSingleId(geneticId, familyId, progenyId, populationId, rametId);
  await addLogs("Edited tree with id: " + treeId);
  await instance.put("trees/edit/" + treeId, {
    treeGeneticId: response.data.id,
    locationId: location,
    gps: gps,
    active: active
  });


}