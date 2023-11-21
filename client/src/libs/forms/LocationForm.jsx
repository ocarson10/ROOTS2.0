import React, { useEffect, useState } from "react";
import "../../libs/style/LocationForm.css";
import { addLocation, editLocation, getLocationByName } from "../services/api-client/locationService";
import LocationHover from "../hover-info/LocationHover";
import { useNavigate } from "react-router-dom";
import LocationShorthandHover from "../hover-info/LocationShorthandHover";

function LocationForm(props) {
  // const [locationForm, setLocationForm] = useState({
  //   location: "",
  //   shortHand: "",
  // });
  // const [currentLocationForm, setCurrentLocationForm] = useState({
  //   location: "",
  //   shortHand: "",
  // });
  const [location, setLocation] = useState("");
  const [shorthand, setShorthand] = useState("");
  const [error, setError] = useState("");
  const [changeId, setChangeId] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.operation === "edit") {
      setChangeId(false);
      const locName = window.location.href.split("/")[5];
      //console.log("location: " + props.location);
      console.log("location: " + props.locationId);
     // console.log("location: " + props.locationId);
      //console.log("location: " + props.uniqueId);



      getLocationByName(props.locationId).then((res) => {
        console.log(res.data);
        setLocation(res.data.location);
        setShorthand(res.data.shorthand);
        
      });
      
    }else{
      setChangeId(true);

    }
  }, [props.operation]);

  const handleSubmit = async (e) => {
    if (props.operation === "add") {
      e.preventDefault();
      await addLocation(location, shorthand)
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
      await editLocation(location, shorthand)
        .then(() => {
          clearForm();
          //window.location.href = "/";
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const clearForm = () => {
    if (props.operation === "add") {
      setLocation("");
    }

    setShorthand("");
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
            value={location}
            id="location"
            onChange={(e) =>{
              setLocation(e.target.value );
              setError("");
            }}
          />
        </div>
        <div className="input-div">
          <label className="entry-label">
            <LocationShorthandHover /> Shorthand:
          </label>
          <input
            type="text"
            value={shorthand}
            id="shorthand"
            onChange={(e) =>{
              setShorthand(e.target.value );
            }}
          />
        </div>
        <div className="button-div">
          <button className="form-button" id="submit" onClick={handleSubmit}>
            Submit
          </button>
          <button className="form-button" id="clear" onClick={clearForm}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default LocationForm;
