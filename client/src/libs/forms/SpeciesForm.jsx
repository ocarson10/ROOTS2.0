import React, { useState, useEffect } from "react";

import "../../libs/style/SpeciesForm.css";
import SpeciesHover from "../hover-info/SpeciesHover";
import SpeciesShorthandHover from "../hover-info/SpeciesShorthandHover";
import { addSpecies, getSpeciesByName, updateSpecies} from "../services/api-client/speciesService";
import { useNavigate } from "react-router-dom";

function SpeciesForm(props) {
  const [speciesForm, setSpeciesForm] = useState({
    species: "",
    shortHand: "",
  });
  const [currentSpeciesForm, setCurrentSpeciesForm] = useState({
    currentSpecies: "",
    currentshortHand: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (props.operation === "edit") {
      const speciesName = window.location.href.split("/")[6];

      getSpeciesByName(speciesName).then((response) => {
        console.log(response.data);

        setSpeciesForm({
          species: response.data.species,
          shortHand: response.data.shorthand,
        });
        setCurrentSpeciesForm({
          currentSpecies: response.data.species,
          currentshortHand: response.data.shorthand,
        });
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [props.operation, currentSpeciesForm.currentSpecies, currentSpeciesForm.currentshortHand]);

  const handleSubmit = async (e) => {
    if(props.operation === "add") {
      e.preventDefault();
      await addSpecies(speciesForm.species, speciesForm.shortHand)
      .then(() => {
        clear();
        navigate("/");
      }).catch((error) => {
        console.log(error);
      });
    } else if(props.operation === "edit") {
      await updateSpecies(speciesForm.species, speciesForm.shortHand, currentSpeciesForm.currentSpecies)
      .then(() => {
        clear();
        navigate("/");
      }).catch((error) => {
        console.log(error);
      });
    }
  }

  const clear = () => {
    setSpeciesForm({
      species: "",
      shortHand: "",
    });
  };

  return (
    <div className="form-div">
      {props.operation === 'add' ?
        <h1>Add Species</h1> :
        <h1>Edit Species</h1>
      }
      <form onSubmit={handleSubmit}>
        
      <div className="input-div">
        <label className="entry-label">
          <SpeciesHover /> Species:
        </label>
        <input 
        type="text"
        value={speciesForm.species}
        id="species"
        onChange={(e) =>
          setSpeciesForm({ ...speciesForm, species: e.target.value })
        }
        />
      </div>
      <div className="input-div">
        <label className="entry-label">
          <SpeciesShorthandHover/> Shorthand:
        </label>
        <input 
        type="text" 
        value={speciesForm.shortHand}
        id="shorthand"
        onChange={(e) =>
          setSpeciesForm({ ...speciesForm, shortHand: e.target.value })
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
          <button className="form-button" id="clear" onClick={clear}>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
}

export default SpeciesForm;