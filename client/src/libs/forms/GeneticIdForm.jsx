import React, {useState} from "react";
import "../../libs/style/GeneticIdForm.css";
import GeneticHover from "../hover-info/GeneticHover";
import GenericHover from "../hover-info/GenericHover";
import ProgenyHover from "../hover-info/ProgenyHover";
import SpeciesHover from "../hover-info/SpeciesHover";
import YearPlanted from "../hover-info/YearPlanted";
import PopulationHover from "../hover-info/PopulationHover";
import { addId } from "../services/api-client/idService";

function GeneticIdForm(props) {
  const [geneticId, setGeneticId] = useState("");
  const [familyId, setFamilyId] = useState("");
  const [rametId, setRametId] = useState("");
  const [progenyId, setProgenyId] = useState("");
  const [species, setSpecies] = useState("");
  const [yearPlanted, setYearPlanted] = useState("");
  const [population, setPopulation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addId(geneticId, familyId, progenyId, species, yearPlanted, population, rametId).then(() => {
      clearForm();
      window.location.href = "/";
    }).catch((error) => {
      console.log(error);
    });
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
    <div className="form-div">
      <form onSubmit={handleSubmit} >
      <h1>Add Genetic Id</h1>

      <div className="input-div">
        <label className="entry-label"><PopulationHover /> Population:</label>
        <input type="text" value={population} onChange={(e) => setPopulation(e.target.value)} />
      </div>

      <div className="input-div">
        <label className="entry-label"><GenericHover text="The family ID of the genetic ID"/> Family Id:</label>
        <input type="text" value={familyId} onChange={(e) => setFamilyId(e.target.value)} />
      </div>

      <div className="input-div">
        <label className="entry-label"><GenericHover text="The Ramet Id of the genetic ID (optional)"/> Ramet Id:</label>
        <input type="text" value={rametId} onChange={(e) => setRametId(e.target.value)} />
      </div>

      <div className="input-div">
        <label className="entry-label"><GeneticHover /> Genetic Id:</label>
        <input type="text" value={geneticId} onChange={(e) => setGeneticId(e.target.value)} />
      </div>

      <div className="input-div">
        <label className="entry-label"><ProgenyHover /> Progeny Id:</label>
        <input type="text" value={progenyId} onChange={(e) => setProgenyId(e.target.value) } />
      </div>

      <div className="input-div">
        <label className="entry-label"><SpeciesHover /> Species:</label>
        <input type="text" value={species} onChange={(e) => setSpecies(e.target.value)} />
      </div>

      <div className="input-div">
        <label className="entry-label"><YearPlanted /> Year Planted:</label>
        <input type="number" value={yearPlanted} onChange={(e) => setYearPlanted(e.target.value)} />
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
