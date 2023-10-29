import React from "react";
import "../../libs/style/SpeciesForm.css";
import SpeciesHover from "../hover-info/SpeciesHover";
import SpeciesShorthandHover from "../hover-info/SpeciesShorthandHover";

function SpeciesForm(props) {
  return (
    <div className="form-div">
      {props.operation === 'add' ?
        <h1>Add Species</h1> :
        <h1>Edit Species</h1>
      }
      <div className="input-div">
        <label className="entry-label"><SpeciesHover /> Species:</label>
        <input type="text" />
      </div>
      <div className="input-div">
        <label className="entry-label"><SpeciesShorthandHover/> Shorthand:</label>
        <input type="text" />
      </div>
      <div className="button-div">
        <button className="form-button" id="submit">Submit</button>
        <button className="form-button" id="clear">Clear</button>
      </div>
    </div>
  );
}

export default SpeciesForm;
