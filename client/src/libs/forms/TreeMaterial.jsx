import React, { useState, useEffect } from "react";
import "../../libs/style/TreeMaterial.css";
import GeneticHover from "../hover-info/GeneticHover";
import GPSHover from "../hover-info/GPSHover";
import PopulationHover from "../hover-info/PopulationHover";
import ProgenyHover from "../hover-info/ProgenyHover";
import LocationHover from "../hover-info/LocationHover";
import GenericHover from "../hover-info/GenericHover";
import { addTree, editTree, getTree } from "../services/api-client/treeService";
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
import ImageUpload from "./ImageUpload";
import { addPhoto, getPhotos } from "../services/api-client/photoService";
import Slideshow from "./Slideshow";
import FileList from "./FileList";
import FileUpload from "./FileUpload";
import { addFile, getFiles } from "../services/api-client/fileService";
import PopulationForm from "./PopulationForm";
import GeneticIdForm from "./GeneticIdForm";
import { getLocations } from "../services/api-client/locationService";

function TreeMaterial(props) {
  const [treeId, setTreeId] = useState("");
  const [geneticId, setGeneticId] = useState({ value: "", label: "" });
  const [familyId, setFamilyId] = useState({ value: "", label: "" });
  const [rametId, setRametId] = useState({ value: "", label: "" });
  const [progenyId, setProgenyId] = useState({ value: "", label: "" });
  const [population, setPopulation] = useState({ value: "", label: "" });
  const [location, setLocation] = useState({ value: "", label: "" });
  const [gps, setGps] = useState("");
  const [error, setError] = useState("");
  const [popOptions, setPopOptions] = useState([]);
  const [famOptions, setFamOptions] = useState([]);
  const [rametOptions, setRametOptions] = useState([]);
  const [genOptions, setGenOptions] = useState([]);
  const [proOptions, setProOptions] = useState([]);
  const [changeId, setChangeId] = useState(true);
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [files, setFiles] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isPopulationFormOpen, setPopulationFormOpen] = useState(false);
  const [isGeneticIdFormOpen, setGeneticIdFormOpen] = useState(false);
  const [locationOptions, setLocationOptions] = useState([]);


  // Function to receive the selected image from child component
  const handleImageSelection = (image) => {
    setSelectedImage(image);
  };
  const handleFileSelection = (file) => {
    setSelectedFile(file);
  };

  const updatePhotos = (newPhotos) => {
    setPhotos(newPhotos);
  };

  useEffect(() => {
    async function loadPhotos() {
      setPhotos(await getPhotos(geneticId));
    }
    async function loadFiles() {
      setFiles(await getFiles(geneticId));
    }
    if(geneticId) {
      loadPhotos();
      loadFiles();
    }
  }, [geneticId]);


  const handleOpenPopulationForm = () => {
    setPopulationFormOpen(true);
  };

  const handleClosePopulationForm = () => {
    setPopulationFormOpen(false);
  };

  const addPopulationOption = (newOption) => {
    // Update the options with the newly added value
    let newValue = {value: newOption, label: newOption}
    setPopOptions([...popOptions, newValue]);
    setGeneticIdFormOpen(true);
  };

  const newPopulationButtonOption = { label: "Add new population", value: "add" };

  const handleCloseGenIdForm = () => {
    setGeneticIdFormOpen(false);
  };

  const addGenIdOption = (newOption) => {
    // Update the options with the newly added value
    let newValue = {value: newOption, label: newOption}
    setGenOptions([...genOptions, newValue]);
  };

  useEffect(() => {
    getExistingLocations();
  }, []);

  useEffect(() => {
    //If editing, set the values to the current values
    if (props.operation === "edit") {
      setChangeId(false);

      //Get tree from id
      getTree(props.treeId).then((tree) => {
        setTreeId(tree.data.treeId);
        setLocation(tree.data.locationId);
        setGps(tree.data.gps);

        getId(tree.data.treeGeneticId).then((id) => {
          setPopulation(id.data.populationId);
          setFamilyId(id.data.familyId);
          setGeneticId(id.data.geneticId);
          setProgenyId(id.data.progenyId);
          setRametId(id.data.rametId);
        });
      });
    } else {
      setChangeId(true);
    }
  }, [props.operation]);

  const handleSubmit = async (e) => {
    if (props.operation === "add") {
      e.preventDefault();
      if (!!selectedFile) {
        await addFile(geneticId.value, selectedFile);
      }
      if (!!selectedImage) {
        await addPhoto(geneticId.value, selectedImage.file);
      }

      await addTree(
        progenyId.value,
        geneticId.value,
        familyId.value,
        population.value,
        rametId.value,
        location.value,
        gps,
        true,
        treeId
      )
        .then(() => {
          clear();
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
          setError("An error occured: " + error);
        });
    } else if (props.operation === "edit") {
      e.preventDefault();
      if(!!selectedImage) {
        await addPhoto(geneticId.value, selectedImage.file);
      }
      if(!!selectedFile) {
        await addFile(geneticId.value, selectedFile);
      }
      await editTree(
        treeId,
        progenyId.value,
        geneticId.value,
        familyId.value,
        population.value,
        rametId.value,
        location.value,
        gps,
        true
      )
        .then(() => {
          clear();
          navigate('/');
        })
        .catch((error) => {
          console.log(error);
          setError("An error occured: " + error);
        });
    }
  };

  const clear = () => {
    if (props.operation === "add") {
      setTreeId("");
    }

    //setTreeId("");
    setGeneticId({ value: "", label: "" });
    setFamilyId({ value: "", label: "" });
    setProgenyId({ value: "", label: "" });
    setPopulation({ value: "", label: "" });
    setRametId({ value: "", label: "" });
    setLocation({ value: "", label: "" });
    setGps("");
    setPopOptions([]);
    setFamOptions([]);
    setGenOptions([]);
    setProOptions([]);
    setRametOptions([]);
    getPopulationsOptions();
    setSelectedImage(null);
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

  // On load, get the population options.
  useEffect(() => {
    getPopulationsOptions();
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
    //props.sendGeneticIdToParent(e.value);

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

  const handleLocationChange = (e) => {
    setError("");
    setLocation({value: e.value, label: e.value});
  }

  return (
    <div className="form-div">
      <div>
      {props.operation === 'add' ?
        <h1>Add Tree</h1> :
        <h1>Edit Tree</h1>
      }

        <div className="input-div">
          <label className="entry-label">Tree ID:</label>
          <input
            type="text"
            value={treeId}
            disabled={!changeId}
            onChange={(e) => {
              setTreeId(e.target.value);
              setError("");
            }}
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
        {!!photos && photos.length !== 0 &&
          <Slideshow photos={photos} updatePhotos={updatePhotos} />
        }
        <ImageUpload onImageSelect={handleImageSelection} />
        <FileUpload onFileSelect={handleFileSelection} />
        {!!files && files.length !== 0 &&
          <FileList files={files} />
        }

        <div className="button-div">
          <button className="form-button" id="submit" onClick={handleSubmit}>
            Submit
          </button>
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

export default TreeMaterial;
