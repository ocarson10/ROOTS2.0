import React, { useState, useEffect } from "react";
import "../../libs/style/GerminationMaterial.css";
import LocationHover from "../hover-info/LocationHover";
import GenericHover from "../hover-info/GenericHover";
import GeneticHover from "../hover-info/GeneticHover";
import ExpectedTransferDateHover from "../hover-info/ExpectedTransferDateHover";
import { getId, getIds } from "../services/api-client/idService";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { getGermination } from "../services/api-client/germinationService";
import { addAcclimation, getAcclimation, updateAcclimation } from "../services/api-client/acclimationService";

function AcclimationForm(props) {
  const [acclimationId, setAcclimationId] = useState("");
  const [geneticId, setGeneticId] = useState({ value: "", label: "" });
  const [dateAcclimation, setDateAcclimation] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [genOptions, setGenOptions] = useState([]);
  const [changeGen, setChangeGen] = useState(true);
  const [changeId, setChangeId] = useState(true);
  const [expectedTransferDate, setExpectedTransferDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.operation === "Edit") {
      setChangeId(false);
      const id = window.location.href.split("/")[5];

      getAcclimation(id).then((response) => {
        getId(response.data.acclimationGeneticId).then((id) => {
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
        setAcclimationId(response.data.acclimationId);
        setDateAcclimation(response.data.dateAcclimation.substring(0, 10));
        setLocation(response.data.locationId);
      }).catch((error) => {
        console.log(error);
        setError("An error occured: " + error);
      });
    } else if (props.prop === "Yes") {
      setChangeGen(false);
      const id = window.location.href.split("/")[5];

      getGermination(id).then((response) => {
        getId(response.data.germinationGeneticId).then((id) => {
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
        }).catch((error) => {
          console.log(error);
          setError("An error occured: " + error);
        });
      }).catch((error) => {
        console.log(error);
        setError("An error occured: " + error);
      });
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
  }, [props]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(props.operation === "Add") {
      await addAcclimation(acclimationId, geneticId.value, dateAcclimation, location, true, expectedTransferDate).then(() => {
        clear();
        navigate("/");
      }).catch((error) => {
        console.log(error);
        setError("An error occured: " + error);
      });
    } else if(props.operation === "Edit") {
      await updateAcclimation(acclimationId, geneticId.value, dateAcclimation, location, true, expectedTransferDate).then(() => {
        clear();
        navigate("/");
      }).catch((error) => {
        console.log(error);
        setError("An error occured: " + error);
      });
    }
  }

  const clear = () => {
    setAcclimationId('');
    setDateAcclimation('');
    setLocation('');
    setGeneticId({ value: "", label: "" });
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
      setExpectedTransferDate(null);
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
        <h1>Add Acclimation Material</h1>

        <div className="input-div">
          <label className="entry-label"><GenericHover text="The ID of the material in the Acclimation stage" />Acclimation ID:</label>
          <input type="text" value={acclimationId} disabled={!changeId} onChange={(e) => { setAcclimationId(e.target.value); setError("") }} />
        </div>

        <div className="input-div">
          <label className="entry-label"><GeneticHover /> Genetic ID:</label>
          <Select options={genOptions} value={geneticId ? geneticId : ""} onChange={handleGenChange} />
        </div>

        <div className="input-div">
          <label className="entry-label"><GenericHover text="The date the material was moved to the acclimation stage" />Date:</label>
          <input type="date" value={dateAcclimation} onChange={(e) => { setDateAcclimation(e.target.value); setError("") }} />
        </div>

        <div className="input-div">
          <label className="entry-label"><LocationHover /> Location:</label>
          <input type="text" value={location} onChange={(e) => { setLocation(e.target.value); setError("") }} />
        </div>

        <div className="input-div">
          <label className="entry-label">
            <ExpectedTransferDateHover /> Expected Transfer Date:
          </label>
          <input
            type="text"
            value={expectedTransferDate}
            onChange={(e) => {
              setExpectedTransferDate(e.target.value);
            }}
          />
        </div>

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

export default AcclimationForm;