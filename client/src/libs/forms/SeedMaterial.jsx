import React, { useState, useEffect } from "react";
import "../../libs/style/SeedMaterial.css";
import LocationHover from "../hover-info/LocationHover";
import ConeHover from "../hover-info/ConeHover";
import OriginHover from "../hover-info/OriginHover";
import QuantityHover from "../hover-info/QuantityHover";
import GenericHover from "../hover-info/GenericHover";
import GeneticHover from "../hover-info/GeneticHover";
import ProgenyHover from "../hover-info/ProgenyHover";
import PopulationHover from "../hover-info/PopulationHover";
import ExpectedTransferDateHover from "../hover-info/ExpectedTransferDateHover";
import { addSeed, getSeed, editSeed } from "../services/api-client/seedService";
import Select from "react-select";
import { getPopulations } from "../services/api-client/populationService";
import {
  getIdsByPopulation,
  getIdsByPopulationAndFamily,
  getIdsByPopulationAndFamilyAndRamet,
  getIdsByPopulationAndFamilyAndRametAndGenetic,
} from "../services/api-client/idService";
import {getId} from "../services/api-client/idService";
import {useNavigate} from "react-router-dom";
import ImageUpload from "./ImageUpload";

function SeedMaterial(props) {
  const [seedId, setSeedId] = useState("");
  const [location, setLocation] = useState("");
  const [cone, setCone] = useState("");
  const [mother, setMother] = useState("");
  const [father, setFather] = useState("");
  const [origin, setOrigin] = useState("");
  const [quantity, setQuantity] = useState("");
  const [date, setDate] = useState("");
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
  const [changeId, setChangeId] = useState(true);
  const [expectedTransferDate, setExpectedTransferDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if(props.operation === "Edit"){
      setChangeId(false);

      const id = window.location.href.split("/")[5];

      getSeed(id).then((seed) => {
        setSeedId(seed.data.id);
        setLocation(seed.data.locationId);
        setCone(seed.data.coneId);
        setMother(seed.data.motherTreeId);
        setFather(seed.data.fatherTreeId);
        setOrigin(seed.data.origin);
        setQuantity(seed.data.quantity);
        setDate(seed.data.dateMade);

        getId(seed.data.seedGeneticId).then((id) => {
          setPopulation(id.data.populationId);
          setFamilyId(id.data.familyId);
          setGeneticId(id.data.geneticId);
          setProgenyId(id.data.progenyId);
          setRametId(id.data.rametId);
        });
      });
    }
  }, [props.operation]);

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

  const handleSubmit = (e) => {
    if (props.operation === "Add") {
      e.preventDefault();
      if (seedId === "") {
        setError("Please enter a seed ID");
        return;
      }
      addSeed(
        seedId,
        mother,
        cone,
        father,
        geneticId.value,
        familyId.value,
        progenyId.value,
        population.value,
        rametId.value,
        origin,
        quantity,
        date,
        location, 
        expectedTransferDate
      )
        .then((res) => {
          if (res.status === 200) {
            clear();
            navigate('/');
          }
        })
        .catch((error) => {
          setError(error.response.data.message);
        });
    }
    else if (props.operation === "Edit") {
      e.preventDefault();
      editSeed(
        seedId,
        mother,
        cone,
        father,
        geneticId.value,
        familyId.value,
        progenyId.value,
        population.value,
        rametId.value,
        origin,
        quantity,
        date,
        location, 
        expectedTransferDate
      )
        .then((res) => {
          if (res.status === 200) {
            clear();
            navigate('/');
          }
        })
        .catch((error) => {
          setError(error.response.data.message);
        });
    }
  };

  const clear = () => {
    if (props.operation === "Add") {
      setSeedId("");
    }

    setMother("");
    setGeneticId({ value: "", label: "" });
    setFamilyId({ value: "", label: "" });
    setProgenyId({ value: "", label: "" });
    setPopulation({ value: "", label: "" });
    setRametId({ value: "", label: "" });
    setLocation("");
    setCone("");
    setOrigin("");
    setQuantity("");
    setDate("");
    setError("");
    setPopOptions([]);
    setFamOptions([]);
    setRametOptions([]);
    setGenOptions([]);
    setProOptions([]);
    getPopulationsOptions();
    setExpectedTransferDate(null);
  };

  return (
    <div className="form-div">
      <h1>Add Seed Material</h1>

      <div className="input-div">
        <label className="entry-label">
          <GenericHover text="ID of the seed." /> Seed ID:
        </label>
        <input
          type="text"
          value={seedId}
          onChange={(e) => setSeedId(e.target.value)}
          disabled={!changeId}
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
          <LocationHover /> Location:
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
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

      <div className="input-div">
        <label className="entry-label">
          <ConeHover /> Cone:
        </label>
        <input
          type="text"
          value={cone}
          onChange={(e) => setCone(e.target.value)}
        />
      </div>

      <div className="input-div">
        <label className="entry-label">Mother:</label>
        <input
          type="text"
          value={mother}
          onChange={(e) => setMother(e.target.value)}
        />
      </div>

      <div className="input-div">
        <label className="entry-label">Father:</label>
        <input
          type="text"
          value={father}
          onChange={(e) => setFather(e.target.value)}
        />
      </div>

      <div className="input-div">
        <label className="entry-label">
          <OriginHover /> Origin:
        </label>
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
        />
      </div>

      <div className="input-div">
        <label className="entry-label">
          <QuantityHover /> Quantity:
        </label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />
      </div>

      <div className="input-div">
        <label className="entry-label">Date Made:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
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
    </div>
  );
}

export default SeedMaterial;
