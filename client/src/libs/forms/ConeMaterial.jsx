import React, { useState, useEffect } from "react";
import "../../libs/style/ConeMaterial.css";
import ProgenyHover from "../hover-info/ProgenyHover";
import GenericHover from "../hover-info/GenericHover";
import PopulationHover from "../hover-info/PopulationHover";
import GeneticHover from "../hover-info/GeneticHover";
import DateHarvestInfo from "../hover-info/DateHarvestInfo";
import LocationHover from "../hover-info/LocationHover";
import { addCone, getCone, editCone } from "../services/api-client/coneService";
import Select from "react-select";
import { getPopulations } from "../services/api-client/populationService";
import { getId } from "../services/api-client/idService";
import {
  getIdsByPopulation,
  getIdsByPopulationAndFamily,
  getIdsByPopulationAndFamilyAndRamet,
  getIdsByPopulationAndFamilyAndRametAndGenetic,
} from "../services/api-client/idService";
import { useNavigate } from "react-router-dom";

function ConeMaterial(props) {
  const [coneId, setConeId] = useState("");
  const [motherTreeId, setMotherTreeId] = useState("");
  const [fatherTreeId, setFatherTreeId] = useState("");
  const [geneticId, setGeneticId] = useState({ value: "", label: "" });
  const [familyId, setFamilyId] = useState({ value: "", label: "" });
  const [rametId, setRametId] = useState({ value: "", label: "" });
  const [progenyId, setProgenyId] = useState({ value: "", label: "" });
  const [population, setPopulation] = useState({ value: "", label: "" });
  const [location, setLocation] = useState("");
  const [dateHarvested, setDateHarvested] = useState("");

  const [error, setError] = useState("");
  const [popOptions, setPopOptions] = useState([]);
  const [famOptions, setFamOptions] = useState([]);
  const [rametOptions, setRametOptions] = useState([]);
  const [genOptions, setGenOptions] = useState([]);
  const [proOptions, setProOptions] = useState([]);
  const [changeId, setChangeId] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (props.operation === "Edit") {
      setChangeId(false);

      const id = window.location.href.split("/")[5];
      console.log("id: " + id);

      getCone(id).then((cone) => {
      console.log("cone found")

        console.log(cone.data.id);
        setConeId(cone.data.id);

        console.log(cone.data.motherTreeId);
        setMotherTreeId(cone.data.motherTreeId);

        console.log(cone.data.fatherTreeId);
        setFatherTreeId(cone.data.fatherTreeId);
        
        getId(cone.data.coneGeneticId).then((id) => {
          setPopulation(id.data.populationId);
          setFamilyId(id.data.familyId);
          setGeneticId(id.data.geneticId);
          setProgenyId(id.data.progenyId);
          setRametId(id.data.rametId);
        });

        console.log(cone.data.locationId);
        setLocation(cone.data.locationId);

        console.log(cone.data.dateHarvested);
        setDateHarvested(cone.data.dateHarvested);
      });
    }
  }, [props.operation]);

  const handleSubmit = (e) => {
    if (props.operation === "Add") {
      e.preventDefault();
      addCone(
        coneId,
        motherTreeId,
        fatherTreeId,
        rametId.value,
        geneticId.value,
        familyId.value,
        progenyId.value,
        population.value,
        dateHarvested,
        location,
        true
      )
        .then(() => {
          clearForm();
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
          setError(error.response.data.message);
        });
    }
    else if(props.operation === "Edit") {
      e.preventDefault();
      editCone(
        coneId,
        motherTreeId,
        fatherTreeId,
        rametId.value,
        geneticId.value,
        familyId.value,
        progenyId.value,
        population.value,
        dateHarvested,
        location,
        true
      )
        .then(() => {
          clearForm();
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
          setError(error.response.data.message);
        });
    }
  };

  const clearForm = () => {
    if(props.operation === "Add") {
      setConeId("");
    }
    
    setMotherTreeId("");
    setFatherTreeId("");
    setGeneticId({ value: "", label: "" });
    setFamilyId({ value: "", label: "" });
    setProgenyId({ value: "", label: "" });
    setPopulation({ value: "", label: "" });
    setRametId({ value: "", label: "" });
    setDateHarvested("");
    setLocation("");
    setPopOptions([]);
    setFamOptions([]);
    setRametOptions([]);
    setGenOptions([]);
    setProOptions([]);
    getPopulationsOptions();
  };

  // function to get the population options
  const getPopulationsOptions = async () => {
    getPopulations().then((populations) => {
      const options = populations.data.map((population) => {
        return {
          value: population.id,
          label: population.id,
        };
      });
      setPopOptions(options);
    });
  };

  // On load, get the population options.
  useEffect(() => {
    getPopulationsOptions();
  }, []);

  // When changing the population, get the family options
  const handlePopulationChange = async (e) => {
    setError("");
    setPopulation({ value: e.value, label: e.value });

    await getIdsByPopulation(e.value).then((ids) => {
      const options = ids.data.map((id) => {
        return {
          value: id.familyId,
          label: id.familyId,
        };
      });
      setFamOptions(options);
    });
  };

  // When changing the family, get the ramet options
  const handleFamilyChange = async (e) => {
    setError("");
    setFamilyId({ value: e.value, label: e.value });
    await getIdsByPopulationAndFamily(population?.value, e.value).then(
      (ids) => {
        let options = ids.data.map((id) => {
          return {
            value: id.rametId,
            label: id.rametId ? id.rametId : "N/A",
          };
        });
        if (options.length < 1) {
          options = [{ value: null, label: "No Ramet Id (select)" }];
        }
        setRametOptions(options);
      }
    );
  };

  const handleRametChange = async (e) => {
    setError("");
    const ram = e.value === null ? 'null' : e.value;
    setRametId({ value: e.value, label: e.value === null ? "N/A" : e.value });
    await getIdsByPopulationAndFamilyAndRamet(
      population.value,
      familyId.value,
      ram
    ).then((ids) => {
      const options = ids.data.map((id) => {
        return {
          value: id.geneticId,
          label: id.geneticId,
        };
      });
      setGenOptions(options);
    });
  };

  const handleGeneticChange = async (e) => {
    setError("");
    setGeneticId({ value: e.value, label: e.value });

    await getIdsByPopulationAndFamilyAndRametAndGenetic(
      population?.value,
      familyId?.value,
      rametId.value,
      e.value
    ).then((ids) => {
      const options = ids.data.map((id) => {
        return {
          value: id.progenyId,
          label: id.progenyId,
        };
      });
      setProOptions(options);
    });
  };

  const handleProgenyChange = (e) => {
    setError("");
    setProgenyId({ value: e.value, label: e.value });
  };

  return (
    <div className="form-div">
      <h1>Add Cone Material</h1>

      <div className="input-div">
        <label className="entry-label">Cone ID:</label>
        <input
          type="text"
          disabled={!changeId}
          value={coneId}
          onChange={(e) => setConeId(e.target.value)}
        />
      </div>

      <div className="input-div">
        <label className="entry-label">Mother Tree ID:</label>
        <input
          type="text"
          value={motherTreeId}
          onChange={(e) => setMotherTreeId(e.target.value)}
        />
      </div>

      <div className="input-div">
        <label className="entry-label">Father Tree ID:</label>
        <input
          type="text"
          value={fatherTreeId}
          onChange={(e) => setFatherTreeId(e.target.value)}
        />
      </div>

      <div className="input-div">
        <label className="entry-label">
          <PopulationHover />
          Population ID:
        </label>
        <Select
          options={popOptions}
          onChange={handlePopulationChange}
          value={population ? population : ""}
        />
      </div>

      <div className="input-div">
        <label className="entry-label">
          <GenericHover text="The family ID of the genetic ID" />
          Family ID:
        </label>
        <Select
          options={famOptions}
          onChange={handleFamilyChange}
          value={familyId ? familyId : ""}
        />
      </div>

      <div className="input-div">
        <label className="entry-label">
          <GenericHover text="The Ramet Id that can be associated with this id (can be blank)" />
          Ramet ID:
        </label>
        <Select
          options={rametOptions}
          onChange={handleRametChange}
          value={rametId ? rametId : ""}
        />
      </div>

      <div className="input-div">
        <label className="entry-label">
          <GeneticHover /> Genetic ID:
        </label>
        <Select
          options={genOptions}
          onChange={handleGeneticChange}
          value={geneticId ? geneticId : ""}
        />
      </div>

      <div className="input-div">
        <label className="entry-label">
          <ProgenyHover /> Progeny ID:
        </label>
        <Select
          options={proOptions}
          onChange={handleProgenyChange}
          value={progenyId ? progenyId : ""}
        />
      </div>

      <div className="input-div">
        <label className="entry-label">
          <DateHarvestInfo /> Date Harvested:
        </label>
        <input
          type="date"
          value={dateHarvested}
          onChange={(e) => setDateHarvested(e.target.value)}
        />
      </div>

      <div className="input-div">
        <label className="entry-label">
          <LocationHover /> Location:
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
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
      {error ? <p className="error">{error}</p> : null}
    </div>
  );
}

export default ConeMaterial;
