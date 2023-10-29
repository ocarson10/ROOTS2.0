import React, { useState } from "react";  
import "../../libs/style/PopulationForm.css";
import { addPopulation } from "../services/api-client/populationService";

function PopulationForm(props) {
  const [populationForm, setPopulationForm] = useState({
    id: "",
  });
  const [fromForm, setFromForm] = useState(props.isOpen ? props.isOpen : false);

  const handleSubmit = (e) => {
    e.preventDefault();
    addPopulation(populationForm.id).then(() => {
      clearForm();
      if (fromForm) {
        props.addPopOption(populationForm.id);
        props.onClose();
      }
      else {
        window.location.href = "/";
      }
    }).catch((error) => {
      console.log(error);
    });
  }
    
  const clearForm = () => {
    setPopulationForm({
      id: "",
    })
    if (fromForm) {
      props.onClose();
    }
  }


  return (
    <div className={`form-div ${props.isOpen ? "modal-open" : ""}`}>
      {props.operation === 'add' ?
        <h1>Add Population</h1> :
        <h1>Edit Population</h1>
      }

      <div className="input-div">
        <label className="entry-label">Population:</label>
        <input type="text" value={populationForm.id} onChange={(e) => setPopulationForm({ ...populationForm, id: e.target.value })}/>
      </div>


      <div className="button-div">
        <button className="form-button" id="submit" onClick={handleSubmit}>Submit</button>
        <button className="form-button" id="clear" onClick={clearForm}>Clear</button>
      </div>

    </div>
  );
}

export default PopulationForm;
