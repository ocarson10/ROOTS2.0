import React, { useState } from "react";
import "../../libs/style/GeneticIdForm.css";
import GeneticHover from "../hover-info/GeneticHover";
import GenericHover from "../hover-info/GenericHover";
import ProgenyHover from "../hover-info/ProgenyHover";
import SpeciesHover from "../hover-info/SpeciesHover";
import YearPlanted from "../hover-info/YearPlanted";
import PopulationHover from "../hover-info/PopulationHover";
import { addId, updateId } from "../services/api-client/idService";

function GeneticIdForm(props) {
  const [geneticId, setGeneticId] = useState('');
  const [familyId, setFamilyId] = useState('');
  const [rametId, setRametId] = useState('');
  const [progenyId, setProgenyId] = useState('');
  const [species, setSpecies] = useState('');
  const [yearPlanted, setYearPlanted] = useState('');
  const [population, setPopulation] = useState('');
  const [fromForm, setFromForm] = useState(props.isOpen ? props.isOpen : false);

  const handleSubmit = async (e) => {
    if(props.operation === 'add') {
      e.preventDefault();
      await addId(geneticId, familyId, progenyId, species, yearPlanted, population, rametId).then(() => {
        clearForm();
        if (fromForm) {
          props.addGenIdOption(geneticId);
          props.onClose();
        }
        else {
          window.location.href = "/";
        }
      }).catch((error) => {
        console.log(error);
      });
    } else {
      e.preventDefault();
      await updateId(props.geneticId, geneticId, familyId, progenyId, species, yearPlanted, population, rametId).then(() => {
        window.location.href = "/";
      });
    }
  }

  const clearForm = () => {
    setGeneticId("");
    setFamilyId("");
    setRametId("");
    setProgenyId("");
    setSpecies("");
    setYearPlanted("");
    setPopulation("");
  }
  
  return (
    <div className={`form-div ${props.isOpen ? "modal-open" : ""}`}>
      <form onSubmit={handleSubmit} >
      {props.operation === 'add' ?
        <h1>Add Genetic Id</h1> :
        <h1>Edit Genetic Id</h1>
      }

      <div className="input-div">
        <label className="entry-label"><PopulationHover /> Population:</label>
        <input type="text" value={population ?? undefined} onChange={(e) => setPopulation(e.target.value)} />
      </div>

      <div className="input-div">
        <label className="entry-label"><GenericHover text="The family ID of the genetic ID"/> Family Id:</label>
        <input type="text" value={familyId ?? undefined} onChange={(e) => setFamilyId(e.target.value)} />
      </div>

      <div className="input-div">
        <label className="entry-label"><GenericHover text="The Ramet Id of the genetic ID (optional)"/> Ramet Id:</label>
        <input type="text" value={rametId ?? undefined} onChange={(e) => setRametId(e.target.value)} />
      </div>

      <div className="input-div">
        <label className="entry-label"><GeneticHover /> Genetic Id:</label>
        <input type="text" value={geneticId ?? undefined} onChange={(e) => setGeneticId(e.target.value)} />
      </div>

      <div className="input-div">
        <label className="entry-label"><ProgenyHover /> Progeny Id:</label>
        <input type="text" value={progenyId ?? undefined} onChange={(e) => setProgenyId(e.target.value) } />
      </div>

      <div className="input-div">
        <label className="entry-label"><SpeciesHover /> Species:</label>
        <input type="text" value={species ?? undefined} onChange={(e) => setSpecies(e.target.value)} />
      </div>

      <div className="input-div">
        <label className="entry-label"><YearPlanted /> Year Planted:</label>
        <input type="number" value={yearPlanted ?? undefined} onChange={(e) => setYearPlanted(e.target.value)} />
      </div>
      
      <div className="button-div">
        <button className="form-button" id="submit">Submit</button>
        <button className="form-button" id="clear" onClick={clearForm}>Clear</button>
      </div>
      </form>
    </div>
  );
}

export default GeneticIdForm;
