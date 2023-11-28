import {instance} from './apiClient';
import {addLogs} from './logsService';

// Get all the locations from the location table in the database
export async function getLocations() {
  const locations = await instance.get("locations");
  return locations;
}

//get location from name
export async function getLocationByName(locationName) {
  const location = await instance.get(`locations/${locationName}`);
  console.log("Location: " + location);
  return location;
}


// Add a new location that materials can be located in to the database given a name,
// and the shorthand abbreviation
export async function addLocation(locationName, locationShorthand, active) {
  await addLogs(`Added location with name: ${locationName}`);
  return await instance.post("locations", {
    location: locationName,
    shorthand: locationShorthand,
    active: active
  });
}

// Edit a location
export async function editLocation( locationName, locationShorthand, active) {
  return await instance.put("locations/edit/"+ locationName, {
    location: locationName,
    shorthand: locationShorthand,
    active: active
  });
}

export async function removeLocation(locationName) {
  await addLogs("Archived Location with id:" + locationName);
  await instance.put("locations/" + locationName);
}
