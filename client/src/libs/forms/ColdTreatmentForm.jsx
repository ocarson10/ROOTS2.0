import React, { useState, useEffect } from "react";
import "../../libs/style/ColdTreatmentForm.css";
import GeneticHover from "../hover-info/GeneticHover";
import LocationHover from "../hover-info/LocationHover";
import GenericHover from "../hover-info/GenericHover";
import Select from 'react-select';
import { addColdTreatment, getColdTreatment, updateColdTreatment } from "../services/api-client/coldTreatmentService";
import { getId, getIds } from "../services/api-client/idService";
import { useNavigate } from "react-router-dom";
import { getMaturation } from "../services/api-client/maturationService";
import ImageUpload from "./ImageUpload";
import FileUpload from "./FileUpload";
import "../../libs/style/ImageUpload.css";
function ColdTreatment(props) {
  const [coldTreatmentId, setColdTreatmentId] = useState("");
  const [geneticId, setGeneticId] = useState({ value: "", label: "" });
  const [numberEmbryos, setNumberEmbryos] = useState("");
  const [dateCold, setDateCold] = useState("");
  const [duration, setDuration] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [genOptions, setGenOptions] = useState([]);
  const [changeGen, setChangeGen] = useState(true);
  const [changeId, setChangeId] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.operation === "Edit") {
      setChangeId(false);
      const id = window.location.href.split("/")[5];
      getColdTreatment(id).then((response) => {
        getId(response.data.coldTreatmentGeneticId).then((id) => {
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
        setColdTreatmentId(response.data.coldTreatmentId);
        setNumberEmbryos(response.data.numberEmbryos);
        setDateCold(response.data.dateCold.substring(0, 10));
        setDuration(response.data.duration);
        setLocation(response.data.locationId);
      }).catch((error) => {
        console.log(error);
        setError("An error occured: " + error);
      });
    } else if (props.prop === "Yes") {
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
      }).catch((error) => {
        console.log(error);
        setError("An error occured: " + error);
      });

      setChangeGen(false);
    }

    getIds().then((response) => {
      const options = response.data.map((id) => {
        return {
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
        };
      });
      setGenOptions(options);
    }).catch((error) => {
      console.log(error);
      setError("An error occured: " + error);
    });
  }, [props])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (props.operation === "Add") {
      await addColdTreatment(coldTreatmentId, geneticId.value, numberEmbryos, dateCold, duration, location, true).then(() => {
        clear();
        navigate("/");
      }).catch((error) => {
        console.log(error);
        setError("An error occured: " + error);
      });
    } else if (props.operation === "Edit") {
      await updateColdTreatment(coldTreatmentId, geneticId.value, numberEmbryos, dateCold, duration, location, true).then(() => {
        clear();
        navigate("/");
      }).catch((error) => {
        console.log(error);
        setError("An error occured: " + error);
      });
    }
  }

  const clear = () => {
    setColdTreatmentId("");
    setNumberEmbryos("");
    setDateCold("");
    setDuration("");
    setLocation("");
    setGenOptions([]);
    getIds().then((response) => {
      const options = response.data.map((id) => {
        return {
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
        };
      });
      setGenOptions(options);
    }).catch((error) => {
      console.log(error);
      setError("An error occured: " + error);
    });
  }

  const handleGenChange = (e) => {
    setGeneticId({ value: e.value, label: e.label });
    setError("");
  };

  return (
    <div className="form-div">
      <h1>Add Cold Treatment Material</h1>

      <div className="input-div">
        <label className="entry-label"><GenericHover text="The ID of the material in the Cold Treatment Stage" />Cold Treatment ID:</label>
        <input type="text" value={coldTreatmentId} disabled={!changeId} onChange={(e) => { setColdTreatmentId(e.target.value); setError("") }} />
      </div>

      <div className="input-div">
        <label className="entry-label"><GeneticHover /> Genetic ID:</label>
        <Select value={geneticId ? geneticId : ''} options={genOptions} onChange={handleGenChange} />
      </div>

      <div className="input-div">
        <label className="entry-label"><GenericHover text="The number of embryos in cold treatment" />Number Of Embryos:</label>
        <input type="text" value={numberEmbryos} onChange={(e) => { setNumberEmbryos(e.target.value); setError("") }} />
      </div>

      <div className="input-div">
        <label className="entry-label"><GenericHover text="The Cold Date For Materials" />Date Cold For Materials:</label>
        <input type="date" value={dateCold} onChange={(e) => { setDateCold(e.target.value); setError("") }} />
      </div>

      <div className="input-div">
        <label className="entry-label"><GenericHover text="The Duration For Cold Treatment" />Duration Of Cold Treatment:</label>
        <input type="text" value={duration} onChange={(e) => { setDuration(e.target.value); setError("") }} />
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

export default ColdTreatment;
