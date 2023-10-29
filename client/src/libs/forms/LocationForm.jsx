import React, { useEffect, useState } from "react";
import "../../libs/style/LocationForm.css";
import { addLocation, editLocation, getLocationByName } from "../services/api-client/locationService";
import LocationHover from "../hover-info/LocationHover";
import LocationShorthandHover from "../hover-info/LocationShorthandHover";

function LocationForm(props) {
  const [locationForm, setLocationForm] = useState({
    location: "",
    shortHand: "",
  });
  const [currentLocationForm, setCurrentLocationForm] = useState({
    location: "",
    shortHand: "",
  });

  useEffect(() => {
    if (props.operation === "edit") {
      const locName = window.location.href.split("/")[5];
      console.log("location: " + locName);

      getLocationByName(locName).then((res) => {
        console.log(res.data);
        setLocationForm({
          location: res.data.location,
          shortHand: res.data.shorthand,
        });
        setCurrentLocationForm({
          location: res.data.location,
          shortHand: res.data.shorthand,
        });
      });
      
    }
  }, [props.operation]);

  const handleSubmit = async (e) => {
    if (props.operation === "add") {
      e.preventDefault();
      await addLocation(locationForm.location, locationForm.shortHand)
        .then(() => {
          clearForm();
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
        });
    }
    else if(props.operation === "edit") {
      console.log("editing");
      e.preventDefault();
      await editLocation(currentLocationForm.location, locationForm.location, locationForm.shortHand)
        .then(() => {
          clearForm();
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const clearForm = () => {
    setLocationForm({
      location: "",
      shortHand: "",
    });
  };

  return (
    <div className="form-div">
      {props.operation === 'add' ?
        <h1>Add Location</h1> :
        <h1>Edit Location</h1>
      }
      <form onSubmit={handleSubmit}>
        <div className="input-div">
          <label className="entry-label">
            <LocationHover /> Location:
          </label>
          <input
            type="text"
            value={locationForm.location}
            id="location"
            onChange={(e) =>
              setLocationForm({ ...locationForm, location: e.target.value })
            }
          />
        </div>
        <div className="input-div">
          <label className="entry-label">
            <LocationShorthandHover /> Shorthand:
          </label>
          <input
            type="text"
            value={locationForm.shortHand}
            id="shorthand"
            onChange={(e) =>
              setLocationForm({ ...locationForm, shortHand: e.target.value })
            }
          />
        </div>
        <div className="button-div">
          <input
            type="submit"
            className="form-button"
            id="submit"
            value="Submit"
          ></input>
          <button className="form-button" id="clear" onClick={clearForm}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default LocationForm;
