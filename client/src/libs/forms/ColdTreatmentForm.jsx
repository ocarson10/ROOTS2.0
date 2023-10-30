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
import { addPhoto, getPhotos } from "../services/api-client/photoService";
import Slideshow from "./Slideshow";
import FileList from "./FileList";
import FileUpload from "./FileUpload";
import { addFile, getFiles } from "../services/api-client/fileService";
import { getLocations } from "../services/api-client/locationService";

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
  const [selectedImage, setSelectedImage] = useState(null);
  const [photos, setPhotos] = useState(null);
  const [files, setFiles] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
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
      setPhotos(await getPhotos(geneticId.value));
    }
    async function loadFiles() {
      setFiles(await getFiles(geneticId.value));
    }
    if (!!geneticId.value) {
      loadPhotos();
      loadFiles();
    }
  }, [geneticId]);

  useEffect(() => {
    getExistingLocations();
  }, []);

  useEffect(() => {
    if (props.operation === "edit") {
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
    if (props.operation === "add") {
      if (!!selectedFile) {
        await addFile(geneticId.value, selectedFile);
      }
      if (!!selectedImage) {
        await addPhoto(geneticId.value, selectedImage.file);
      }
      await addColdTreatment(coldTreatmentId, geneticId.value, numberEmbryos, dateCold, duration, location, true).then(() => {
        clear();
        navigate("/");
      }).catch((error) => {
        console.log(error);
        setError("An error occured: " + error);
      });
    } else if (props.operation === "edit") {
      if (!!selectedFile) {
        await addFile(geneticId.value, selectedFile);
      }
      if (!!selectedImage) {
        await addPhoto(geneticId.value, selectedImage.file);
      }
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
    setLocation({ value: "", label: "" });
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

  const handleLocationChange = (e) => {
    setError("");
    setLocation({value: e.value, label: e.value});
  }

  const handleGenChange = (e) => {
    setGeneticId({ value: e.value, label: e.label });
    setError("");
  };

  return (
    <div className="form-div">
      {props.operation === 'add' ?
        <h1>Add Cold Treatment</h1> :
        <h1>Edit Cold Treatment</h1>
      }

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
        <label className="entry-label">
          <LocationHover text="Location of Maintenance" /> Location:
          </label>
          <Select
            options={locationOptions}
            onChange={handleLocationChange}
            value={location ? location : ""}
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
      <div className="error-div">
        <p>{error}</p>
      </div>
    </div>

  );
}

export default ColdTreatment;
