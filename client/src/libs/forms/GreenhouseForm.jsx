import React, {useState, useEffect} from "react";
import "../../libs/style/GerminationMaterial.css";
import LocationHover from "../hover-info/LocationHover";
import GenericHover from "../hover-info/GenericHover";
import Select from 'react-select';
import { addGreenhouse, getGreenhouse, updateGreenhouse } from "../services/api-client/greenhouseService";
import { getId, getIds } from "../services/api-client/idService";
import { useNavigate } from "react-router-dom";
import { getAcclimation } from "../services/api-client/acclimationService";
import GeneticHover from "../hover-info/GeneticHover";

function GreenhouseForm(props) {
  const [greenHouseId, setGreenHouseId] = useState("");
  const [geneticId, setGeneticId] = useState({ value: "", label: "" });
  const [dateGreenhouse, setDateGreenhouse] = useState("");
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

      getGreenhouse(id).then((response) => {
        getId(response.data.greenhouseGeneticId).then((id) => {
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
        setGreenHouseId(response.data.greenhouseId);
        setDateGreenhouse(response.data.dateGreenhouse.substring(0, 10));
        setLocation(response.data.locationId);
      }).catch((error) => {
        console.log(error);
        setError("An error occured: " + error);
      });
    } else if (props.prop === "Yes") {
      setChangeGen(false);
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
        setGreenHouseId(response.data.greenhouseId);
        setDateGreenhouse(response.data.dateGreenhouse);
        setLocation(response.data.location);
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
      await addGreenhouse(greenHouseId, geneticId.value, dateGreenhouse, location, true).then(() => {
        clear();
        navigate("/");
      }).catch((error) => {
        console.log(error);
        setError("An error occured: " + error);
      });
    } else if (props.operation === "Edit") {
      await updateGreenhouse(greenHouseId, geneticId.value, dateGreenhouse, location, true).then(() => {
        clear();
        navigate("/");
      }).catch((error) => {
        console.log(error);
        setError("An error occured: " + error);
      });
    }
  }

  const clear = () => {
    setGreenHouseId("");
    setGeneticId("");
    setDateGreenhouse("");
    setLocation("");
    setError("");
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
    }
    );
  }

  const handleGenChange = (e) => {
    setGeneticId({ value: e.value, label: e.label });
    setError("");
  };

  return (
    <div className="form-div">
      <h1>Add Greenhouse Material</h1>

      <div className="input-div">
        <label className="entry-label"><GenericHover text="The ID of the material in the Greenhouse stage"/>Greenhouse ID:</label>
        <input type="text" value={greenHouseId} disabled={!changeId} onChange={(e) => {setGreenHouseId(e.target.value); setError("")}} />
      </div>

      <div className="input-div">
        <label className="entry-label"><GeneticHover /> Genetic ID:</label>
        <Select options={genOptions} value={geneticId ? geneticId : ""} onChange={handleGenChange} />
      </div>

      <div className="input-div">
        <label className="entry-label"><GenericHover text="The date the material was moved to the greenhouse"/>Date:</label>
        <input type="date" value={dateGreenhouse} onChange={(e) => {setDateGreenhouse(e.target.value); setError("")}} />
      </div>

      <div className="input-div">
        <label className="entry-label"><LocationHover /> Location:</label>
        <input type="text" value={location} onChange={(e) => { setLocation(e.target.value); setError("")}} />
      </div>      
      <ImageUpload></ImageUpload>
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

export default GreenhouseForm;
