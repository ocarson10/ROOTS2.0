import React, { useState, useEffect } from "react";
import "../../libs/style/MaturationForm.css";
import GeneticHover from "../hover-info/GeneticHover";
import LocationHover from "../hover-info/LocationHover";
import GenericHover from "../hover-info/GenericHover";
import Select from 'react-select';
import { addMaturation, getMaturation, updateMaturation } from "../services/api-client/maturationService";
import { useNavigate } from "react-router-dom";
import { getMaintenance } from "../services/api-client/maintenanceService";
import { getId, getIds } from "../services/api-client/idService";
import ImageUpload from "./ImageUpload";
import FileUpload from "./FileUpload";
import "../../libs/style/ImageUpload.css";
function Maturation(props) {

  const [maturationId, setMaturationId] = useState("");
  const [geneticId, setGeneticId] = useState({ value: "", label: "" });
  const [numberOfPlates, setNumberOfPlates] = useState("");
  const [mediaBatch, setMediaBatch] = useState("");
  const [dateMatured, setDateMatured] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [genOptions, setGenOptions] = useState([]);
  const [changeGen, setChangeGen] = useState(true);
  const [changeId, setChangeId] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.operation === "edit") {
      setChangeId(false);
      const id = window.location.href.split("/")[5];

      getMaturation(id).then((response) => {
        getId(response.data.maturationGeneticId).then((id) => {
          setGeneticId({
            value: id.data.id, label: "P" +
              id.data.populationId +
              "_" +
              id.data.familyId +
              "_" +
              (id.data.rametId ? id.data.rametId : "NA") +
              "_" +
              id.data.geneticId +
              "_" +
              id.data.progenyId,
          });
        });
        setMaturationId(response.data.maturationId);
        setNumberOfPlates(response.data.numberOfPlates);
        setMediaBatch(response.data.mediaBatch);
        setDateMatured(response.data.dateMatured);
        setLocation(response.data.locationId);
      }).catch((error) => {
        console.log(error);
        setError("An error occured: " + error);
      });
    } else if (props.prop === "Yes") {
      const id = window.location.href.split("/")[5];

      getMaintenance(id).then((response) => {
        getId(response.data.maintenanceGeneticId).then((id) => {
          setGeneticId({
            value: id.data.id, label: "P" +
              id.data.populationId +
              "_" +
              id.data.familyId +
              "_" +
              (id.data.rametId ? id.data.rametId : "NA") +
              "_" +
              id.data.geneticId +
              "_" +
              id.data.progenyId,
          });
        });

        setNumberOfPlates(response.data.numberOfPlates);
        setMediaBatch(response.data.mediaBatch);
        setLocation(response.data.location);
      }).catch((error) => {
        console.log(error);
        setError("An error occured: " + error);
      });

      setChangeGen(false);
    }

    getIds()
      .then((response) => {
        let options = [];
        response.data.forEach((id) => {
          options.push({
            value: id.id,
            label:
              "P" +
              id.populationId +
              "_" +
              id.familyId +
              "_" +
              (id.rametId ? id.rametId : "NA") +
              "_" +
              id.geneticId +
              "_" +
              id.progenyId,
          });
        });
        setGenOptions(options);
      })
      .catch((error) => {
        setError(error);
      });
  }, [props]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (props.operation === "add") {
      await addMaturation(maturationId, geneticId.value, numberOfPlates, mediaBatch, dateMatured, location, true).then(() => {
        clear();
        navigate("/");
      }).catch((error) => {
        console.log(error);
        setError("An error occured: " + error);
      });
    } else if (props.operation === "edit") {
      await updateMaturation(maturationId, geneticId.value, numberOfPlates, mediaBatch, dateMatured, location, true).then(() => {
        clear();
        navigate("/");
      }).catch((error) => {
        console.log(error);
        setError("An error occured: " + error);
      });
    }
  };

  const clear = () => {
    setMaturationId("");
    setNumberOfPlates("");
    setMediaBatch("");
    setDateMatured("");
    setLocation("");
    setGenOptions([]);
    getIds()
      .then((response) => {
        let options = [];
        response.data.forEach((id) => {
          options.push({
            value: id.id,
            label:
              "P" +
              id.populationId +
              "_" +
              id.familyId +
              "_" +
              (id.rametId ? id.rametId : "NA") +
              "_" +
              id.geneticId +
              "_" +
              id.progenyId,
          });
        });
        setGenOptions(options);
      })
      .catch((error) => {
        setError(error);
      });
  }

  const handleGenChange = (e) => {
    setGeneticId({ value: e.value, label: e.label });
    setError("");
  };

  return (
    <div className="form-div">
      <h1>Add Maturation Material</h1>

      <div className="input-div">
        <label className="entry-label"><GenericHover text="The ID of the material in the Maturation stage" />Maturation ID:</label>
        <input type="text" value={maturationId} disabled={!changeId} onChange={(e) => { setMaturationId(e.target.value); setError("") }} />
      </div>

      <div className="input-div">
        <label className="entry-label"><GeneticHover /> Genetic ID:</label>
        <Select options={genOptions} value={geneticId ? geneticId : ""} onChange={handleGenChange} />
      </div>

      <div className="input-div">
        <label className="entry-label"><GenericHover text="The number of plates in Maturation" />Number Of Plates:</label>
        <input type="text" value={numberOfPlates} onChange={(e) => { setNumberOfPlates(e.target.value); setError("") }} />
      </div>

      <div className="input-div">
        <label className="entry-label"><GenericHover text="The Media Batch in Maturation Stage" />Media Batch:</label>
        <input type="text" value={mediaBatch} onChange={(e) => { setMediaBatch(e.target.value); setError("") }} />
      </div>

      <div className="input-div">
        <label className="entry-label"><GenericHover text="Material Maturation Date" />Maturation Date</label>
        <input type="date" value={dateMatured} onChange={(e) => { setDateMatured(e.target.value); setError("") }} />
      </div>

      <div className="input-div">
        <label className="entry-label"><LocationHover text="Location of Maintenance" /> Location:</label>
        <input type="text" value={location} onChange={(e) => { setLocation(e.target.value); setError("") }} />
      </div>
      <ImageUpload></ImageUpload>
      <FileUpload></FileUpload>
      <div className="button-div">
        <button className="form-button" id="submit" onClick={handleSubmit}>
          Submit
        </button>
        <button className="form-button" id="clear" onClick={clear}>
          Clear
        </button>
      </div>
      <div className="error-div">
        <p>{error}</p>
      </div>
    </div>

  );

}

export default Maturation;
