import {instance} from './apiClient';
import {addLogs} from './logsService';

// Get all the locations from the location table in the database
export async function getLocations() {
  const locations = await instance.get("locations");
  return locations;
}

//get location by locationName
export async function getLocationByName(locationName) {
  const location = await instance.get(`locations/${locationName}`);
  console.log("Location: " + location);
  return location;
}


// Add a new location that materials can be located in to the database given a name,
// and the shorthand abbreviation
export async function addLocation(locationName, locationShorthand) {
  await addLogs(`Added location with name: ${locationName}`);
  return await instance.post("locations", {
    location: locationName,
    shorthand: locationShorthand
  });
}

// Edit a location
export async function editLocation(currentLocationName, locationName, locationShorthand) {
  return await instance.put("locations", {
    currentLocationName: currentLocationName,
    location: locationName,
    shorthand: locationShorthand
  });
}

