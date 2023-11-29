import React, { useState, useEffect } from 'react';
import PopulationHover from '../hover-info/PopulationHover';
import GenericHover from '../hover-info/GenericHover';
import GeneticHover from '../hover-info/GeneticHover';
import ProgenyHover from '../hover-info/ProgenyHover';
import LocationHover from '../hover-info/LocationHover';
import GPSHover from '../hover-info/GPSHover';
import Select from 'react-select';
import { addRamet, getRamets, updateRamet } from '../services/api-client/rametService';
import { getPopulations } from '../services/api-client/populationService';
import {
  getIdsByPopulation,
  getIdsByPopulationAndFamily,
  getIdsByPopulationAndFamilyAndRamet,
  getIdsByPopulationAndFamilyAndRametAndGenetic,
} from '../services/api-client/idService';
import PopulationForm from "./PopulationForm";
import GeneticIdForm from "./GeneticIdForm";
import { getLocations } from "../services/api-client/locationService";
import { getTrees } from "../services/api-client/treeService";

function RametForm(props) {
  const [id, setId] = useState('');
  const [gps, setGps] = useState('');
  const [motherTreeId, setMotherTreeId] = useState({value:"", label:""});
  const [motherTreeIdOptions, setMotherTreeIdOptions] = useState([]);
  const [location, setLocation] = useState('');
  const [geneticId, setGeneticId] = useState({ value: "", label: "" });
  const [familyId, setFamilyId] = useState({ value: "", label: "" });
  const [rametId, setRametId] = useState({ value: "", label: "" });
  const [progenyId, setProgenyId] = useState({ value: "", label: "" });
  const [population, setPopulation] = useState({ value: "", label: "" });
  const [error, setError] = useState("");
  const [popOptions, setPopOptions] = useState([]);
  const [famOptions, setFamOptions] = useState([]);
  const [rametOptions, setRametOptions] = useState([]);
  const [genOptions, setGenOptions] = useState([]);
  const [proOptions, setProOptions] = useState([]);
  const [isPopulationFormOpen, setPopulationFormOpen] = useState(false);
  const [isGeneticIdFormOpen, setGeneticIdFormOpen] = useState(false);
  const [locationOptions, setLocationOptions] = useState([]);
  const [changeId, setChangeId] = useState(true);

  const handleOpenPopulationForm = () => {
    setPopulationFormOpen(true);
  };

  const handleClosePopulationForm = () => {
    setPopulationFormOpen(false);
  };

  const addPopulationOption = (newOption) => {
    // Update the options with the newly added value
    let newValue = { value: newOption, label: newOption }
    setPopOptions([...popOptions, newValue]);
    setGeneticIdFormOpen(true);
  };

  const newPopulationButtonOption = { label: "Add new population", value: "add" };

  const handleCloseGenIdForm = () => {
    setGeneticIdFormOpen(false);
  };

  const addGenIdOption = (newOption) => {
    // Update the options with the newly added value
    let newValue = { value: newOption, label: newOption }
    setGenOptions([...genOptions, newValue]);
  };

  const handleLocationChange = (e) => {
    setError("");
    setLocation({ value: e.value, label: e.value });
  }

  const getExistingLocations = async () => {
    getLocations().then((locations) => {
      const options = locations.data.map((loc) => {
        return {
          value: loc.location,
          label: loc.location
        };
      });
      setLocationOptions(options);
      console.log(options);
    });
  };

  useEffect(() => {
    getExistingLocations();
  }, []);


  useEffect(() => {
    if (props.operation === "edit") {
      setId(props.rametId);
      setChangeId(false);
    }
  },[]);

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

  // function to get the mother tree options
  const getMotherTreeOptions = async () => {
    getTrees().then((motherTrees) => {
      const options = motherTrees.data.map((motherTree) => {
        return {
          value: motherTree.treeId,
          label: motherTree.treeId,
        };
      });
      setMotherTreeIdOptions(options);
    });
  };

  // On load, get the population options.
  useEffect(() => {
    getPopulationsOptions();
    getMotherTreeOptions();
  }, []);

  // When changing the population, get the family options
  const handlePopulationChange = async (e) => {
    if (e.value === "add") {
      handleOpenPopulationForm();
    }
    else {
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
    }
  };

  // When changing the family, get the ramet options
  const handleFamilyChange = async (e) => {
    setError("");
    setFamilyId({ value: e.value, label: e.value });
    await getIdsByPopulationAndFamily(population?.value, e.value).then((ids) => {
      let options = ids.data.map((id) => {
        return {
          value: id.rametId,
          label: id.rametId,
        };
      });
      if (options.length < 1) {
        options = [{ value: null, label: "No Ramet Id (select)" }]
      }
      setRametOptions(options);
    });
  };

  // gets the genetic ids
  const handleRametChange = async (e) => {
    setError("");
    setRametId({ value: e.value, label: e.value })
    await getIdsByPopulationAndFamilyAndRamet(population.value, familyId.value, e.value).then((ids) => {
      const options = ids.data.map((id) => {
        return {
          value: id.geneticId,
          label: id.geneticId
        }
      });
      setGenOptions(options);
    });
  }

  // Gets the progeny ids
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

  // Sets the progeny id
  const handleProgenyChange = (e) => {
    setError("");
    setProgenyId({ value: e.value, label: e.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rametId === "" || motherTreeId === "") {
      setError("Please enter a ramet ID and Mother Tree Id");
      return;
    }
    if (props.operation === "add") {
      try {
        const res = await addRamet(
          id,
          motherTreeId.value,
          geneticId.value,
          familyId.value,
          progenyId.value,
          population.value,
          rametId.value,
          location.value,
          gps
        );
    
        if (res.status === 200) {
          await props.handleFilesSubmit(id);
          clear();
          window.location.href = "/";
        }
      } catch (error) {
        setError(error.response.data.message);
      }
    } else if (props.operation === "edit") {
      try {
        const res = await updateRamet(
          id,
          motherTreeId.value,
          progenyId.value,
          geneticId.value,
          familyId.value,
          rametId.value,
          population.value,
          location.value,
          gps,
          true
        );
    
        if (res.status === 200) {
          await props.handleFilesSubmit(id);
          clear();
          window.location.href = "/";
        }
      } catch (error) {
        setError(error.data.message);
      }
    
    }
  };

  const clear = () => {
    setId("");
    setMotherTreeId("");
    setGeneticId({ value: "", label: "" });
    setFamilyId({ value: "", label: "" });
    setProgenyId({ value: "", label: "" });
    setPopulation({ value: "", label: "" });
    setRametId({ value: "", label: "" });
    setLocation({ value: "", label: "" });
    setGps("");
    setError("");
    setPopOptions([]);
    setFamOptions([]);
    setRametOptions([]);
    setGenOptions([]);
    setProOptions([]);
    getPopulationsOptions();
  };


  return (
    <div className="form-div">
      <div>
        {props.operation === 'add' ?
          <h1>Add Ramet</h1> :
          <h1>Edit Ramet</h1>
        }

        <div className="input-div">
          <label className="entry-label">Ramet ID:</label>
          <input
            type="text"
            value={props.rametId ?? id}
            disabled={!changeId}
            onChange={(e) => {
              setId(e.target.value);
              setError("");
            }}
          />
        </div>

        <div className="input-div">
          <label className="entry-label">Mother Tree ID:</label>
          <Select
          options={motherTreeIdOptions}
          onChange={(e) => setMotherTreeId({value:e.value,label: e.value})}
          value={motherTreeId ? motherTreeId : ""}
        />
        </div>

        <div className="input-div">
          <label className="entry-label">
            <PopulationHover />
            Population ID:
          </label>
          <Select
            options={[newPopulationButtonOption, ...popOptions]}
            onChange={handlePopulationChange}
            value={population ? population : ""}
          />
          {isPopulationFormOpen &&
            <PopulationForm
              isOpen={isPopulationFormOpen}
              onClose={handleClosePopulationForm}
              addPopOption={addPopulationOption}
            />
          }
          {isGeneticIdFormOpen &&
            <GeneticIdForm
              isOpen={isGeneticIdFormOpen}
              onClose={handleCloseGenIdForm}
              addGenIdOption={addGenIdOption}
            />
          }
        </div>

        <div className="input-div">
          <label className="entry-label">
            <GenericHover text="The family ID of the genetic ID" />
            Family ID:
          </label>
          <Select
            options={famOptions}
            onChange={handleFamilyChange}
            value={familyId ? familyId : ''}
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
            value={rametId ? rametId : ''}
          />
        </div>

        <div className="input-div">
          <label className="entry-label">
            <GeneticHover /> Genetic ID:
          </label>
          <Select
            options={genOptions}
            onChange={handleGeneticChange}
            value={geneticId ? geneticId : ''}
          />
        </div>

        <div className="input-div">
          <label className="entry-label">
            <ProgenyHover /> Progeny ID:
          </label>
          <Select
            options={proOptions}
            onChange={handleProgenyChange}
            value={progenyId ? progenyId : ''}
          />
        </div>

        <div className="input-div">
          <label className="entry-label">
            <LocationHover /> Location:
          </label>
          <Select
            options={locationOptions}
            onChange={handleLocationChange}
            value={location ? location : ""}
          />
        </div>

        <div className="input-div">
          <label className="entry-label">
            <GPSHover /> GPS:
          </label>
          <input
            type="text"
            value={gps}
            onChange={(e) => {
              setGps(e.target.value);
              setError("");
            }}
          />
        </div>
        <div className="button-div">
          <button
            className="form-button"
            id="submit"
            onClick={handleSubmit}
          >Submit</button>
          <button className="form-button" id="clear" onClick={clear}>
            Clear
          </button>
        </div>
      </div>
      <div className="error-div">
        <p>{error}</p>
      </div>
    </div>
  );
}

export default RametForm
