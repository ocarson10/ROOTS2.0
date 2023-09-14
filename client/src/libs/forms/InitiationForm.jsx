import React, { useState, useEffect } from "react";
import "../../libs/style/Initiation.css";
import GeneticHover from "../hover-info/GeneticHover";
import LocationHover from "../hover-info/LocationHover";
import GenericHover from "../hover-info/GenericHover";
import { addInitiation, getInitiation, editInitiation } from "../services/api-client/initiationService";
import Select from "react-select";
import { getIds, getId } from "../services/api-client/idService";
import { getSeed } from "../services/api-client/seedService";
import { useNavigate } from "react-router-dom";

function Initiation(props) {
  const [initiationId, setInitiationId] = useState("");
  const [seedId, setSeedId] = useState("");
  const [seedsAndEmbryos, setSeedsAndEmbryos] = useState("");
  const [mediaBatch, setMediaBatch] = useState("");
  const [numberOfPlates, setNumberOfPlates] = useState("");
  const [dateMade, setDateMade] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [genOptions, setGenOptions] = useState([]);
  const [geneticId, setGeneticId] = useState({ value: "", label: "" });
  const [changeId, setChangeId] = useState(true);
  const [changeGen, setChangeGen] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (props.operation === "Edit") {
      setChangeId(false);

      const id = window.location.href.split("/")[5];
      console.log("id: " + id);

      getInitiation(id)
        .then((response) => {
          setInitiationId(response.data.initiationId);
          setSeedsAndEmbryos(response.data.seedsAndEmbryos);
          setMediaBatch(response.data.mediaBatch);
          setNumberOfPlates(response.data.numberOfPlates);
          setDateMade(response.data.dateMade);
          setLocation(response.data.locationId);
          getId(response.data.initiationGeneticId).then((id) => {
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
            })
          });
        })
        .catch((error) => {
          setError(error);
        });
    }
    else if (props.prop === "Yes") {
      const id = window.location.href.split("/")[5];
      getSeed(id).then((response) => {
        getId(response.data.seedGeneticId).then((id) => {
          console.log(id.data);
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
          setSeedId(response.data.seedGeneticId);
        });
      }).catch((error) => {
        setError(error);
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
  }, [props.operation, props]);

  // useEffect(() => {
  //   getId(seedId).then((id) => {
  //     console.log(id);
  //     setGeneticId({
  //       value: id.id, label: "P" +
  //         id.populationId +
  //         "_" +
  //         id.familyId +
  //         "_" +
  //         (id.rametId ? id.rametId : "NA") +
  //         "_" +
  //         id.geneticId +
  //         "_" +
  //         id.progenyId,
  //     });
  //   }).catch((error) => {
  //     setError(error);
  // });
  // }, [seedId]);

  const handleSubmit = async (e) => {
    if (props.operation === "Add") {
      e.preventDefault();
      await addInitiation(
        initiationId,
        geneticId.value,
        seedsAndEmbryos,
        mediaBatch,
        numberOfPlates,
        dateMade,
        location,
        true
      )
        .then(() => {
          clear();
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          setError("An error occured: " + error);
        });
    }
    else if (props.operation === "Edit") {
      e.preventDefault();
      await editInitiation(
        initiationId,
        geneticId.value,
        seedsAndEmbryos,
        mediaBatch,
        numberOfPlates,
        dateMade,
        location,
        true
      )
        .then(() => {
          clear();
          navigate("/");
        })
        .catch((error) => {
          console.log(error);
          setError("An error occured: " + error);
        });
    }


  };

  const clear = () => {
    setInitiationId("");
    setSeedsAndEmbryos("");
    setMediaBatch("");
    setNumberOfPlates("");
    setDateMade("");
    setLocation("");
    setError("");
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
  };

  const handleGenChange = (e) => {
    setGeneticId({ value: e.value, label: e.label });
    setError("");
  };

  return (
    <div className="form-div">
      <h1>Add Initiation Material</h1>

      <div className="input-div">
        <label className="entry-label">
          <GenericHover text="The ID of the material in the Initiation stage" />
          Initiation ID:
        </label>
        <input
          type="text"
          value={initiationId}
          disabled={!changeId}
          onChange={(e) => {
            setInitiationId(e.target.value);
            setError("");
          }}
        />
      </div>

      <div className="input-div">
        <label className="entry-label">
          <GeneticHover /> Genetic ID:
        </label>
        <Select
          isDisabled={!changeGen}
          options={genOptions}
          value={geneticId ? geneticId : ""}
          onChange={handleGenChange}
        />
      </div>

      <div className="input-div">
        <label className="entry-label">
          <GenericHover text="The number of seeds and embryos in germination" />
          Seeds and Embryos:
        </label>
        <input
          type="text"
          value={seedsAndEmbryos}
          onChange={(e) => {
            setSeedsAndEmbryos(e.target.value);
            setError("");
          }}
        />
      </div>

      <div className="input-div">
        <label className="entry-label">
          <GenericHover text="The media batch the materials are stored in" />
          Media Batch:
        </label>
        <input
          type="text"
          value={mediaBatch}
          onChange={(e) => {
            setMediaBatch(e.target.value);
            setError("");
          }}
        />
      </div>

      <div className="input-div">
        <label className="entry-label">
          <GenericHover text="The number of plates" />
          Number Of Plates:
        </label>
        <input
          type="text"
          value={numberOfPlates}
          onChange={(e) => {
            setNumberOfPlates(e.target.value);
            setError("");
          }}
        />
      </div>

      <div className="input-div">
        <label className="entry-label">
          <GenericHover text="The Inititiation Date" />
          Date of Initiation:
        </label>
        <input
          type="date"
          value={dateMade}
          onChange={(e) => {
            setDateMade(e.target.value);
            setError("");
          }}
        />
      </div>

      <div className="input-div">
        <label className="entry-label">
          <LocationHover text="Location of Initiation" /> Location:
        </label>
        <input
          type="text"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setError("");
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

export default Initiation;