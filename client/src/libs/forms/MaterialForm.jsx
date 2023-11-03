import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import AcclimationForm from './AcclimationForm';
import ColdTreatmentForm from './ColdTreatmentForm';
import ConeMaterial from './ConeMaterial';
import FieldstationForm from './FieldstationForm';
import GeneticIdForm from './GeneticIdForm';
import GerminationForm from './GerminationForm';
import GreenhouseForm from './GreenhouseForm';
import InitiationForm from './InitiationForm';
import LocationForm from './LocationForm'
import MaintenanceForm from './MaintenanceForm';
import MaturationForm from './MaturationForm';
import PopulationForm from './PopulationForm';
import RametForm from './RametForm';
import SeedMaterial from './SeedMaterial';
import SpeciesForm from './SpeciesForm';
import TreeMaterial from './TreeMaterial';
import ImageUpload from "./ImageUpload";
import { addPhoto, getPhotos } from "../services/api-client/photoService";
import Slideshow from "./Slideshow";
import FileList from "./FileList";
import FileUpload from "./FileUpload";
import { addFile, getFiles } from "../services/api-client/fileService";
import '../../libs/style/Material.css';

function MaterialForm(props) {
	const { material, action, id } = useParams();
	const [selectedImage, setSelectedImage] = useState(null);
	const [photos, setPhotos] = useState(null);
	const [files, setFiles] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);

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

	const handleFileSubmit = async (materialId) => {
		if (!!selectedImage) {
			await addPhoto(materialId, selectedImage.file);
		}
		if (!!selectedFile) {
			await addFile(materialId, selectedFile.file);
		}
	};

	useEffect(() => {
		async function loadPhotos() {
		  setPhotos(await getPhotos(material, id));
		}
		async function loadFiles() {
		  setFiles(await getFiles(material, id));
		}
		if (id) {
			loadPhotos();
			loadFiles();
		}
	}, [id]);

	return (
		<div className='parent-container'>
			<div className='flex-container'>
				<div className='flex-child'>
					{material === 'acclimation' &&
						<>
							<AcclimationForm operation={action} acclimationId={id} handeFilesSubmit={handleFileSubmit} />
						</>
					}
					{material === 'cold-treatment' &&
						<>
							<ColdTreatmentForm operation={action} acclimationId={id} handeFilesSubmit={handleFileSubmit} />
						</>
					}
					{material === 'cones' && (
						<>
							<ConeMaterial operation={action} coneId={id} handeFilesSubmit={handleFileSubmit} />
						</>
					)}
					{material === 'fieldstation' && (
						<>
							<FieldstationForm operation={action} fieldstationId={id} handeFilesSubmit={handleFileSubmit} />
						</>
					)}
					{material === 'genetic-id' && (
						<>
							<GeneticIdForm operation={action} geneticId={id} handeFilesSubmit={handleFileSubmit} />
						</>
					)}
					{material === 'germination' && (
						<>
							<GerminationForm operation={action} germinationId={id} handeFilesSubmit={handleFileSubmit} />
						</>
					)}
					{material === 'greenhouse' && (
						<>
							<GreenhouseForm operation={action} greenhouseId={id} handeFilesSubmit={handleFileSubmit} />
						</>
					)}
					{material === 'initiation' && (
						<>
							<InitiationForm operation={action} initiationId={id} handeFilesSubmit={handleFileSubmit} />
						</>
					)}
					{material === 'location' && (
						<>
							<LocationForm operation={action} locationId={id} handeFilesSubmit={handleFileSubmit} />
						</>
					)}
					{material === 'maintenance' && (
						<>
							<MaintenanceForm operation={action} maintenanceId={id} handeFilesSubmit={handleFileSubmit} />
						</>
					)}
					{material === 'maturation' && (
						<>
							<MaturationForm operation={action} maturationId={id} handeFilesSubmit={handleFileSubmit} />
						</>
					)}
					{material === 'population' && (
						<>
							<PopulationForm operation={action} populationId={id} handeFilesSubmit={handleFileSubmit} />
						</>
					)}
					{material === 'ramet-material' && (
						<>
							<RametForm operation={action} rametId={id} handeFilesSubmit={handleFileSubmit} />
						</>
					)}
					{material === 'seeds' && (
						<>
							<SeedMaterial operation={action} seedId={id} handeFilesSubmit={handleFileSubmit} />
						</>
					)}
					{material === 'species' && (
						<>
							<SpeciesForm operation={action} speciesId={id} handeFilesSubmit={handleFileSubmit} />
						</>
					)}
					{material === 'trees' && (
						<>
							<TreeMaterial operation={action} treeId={id} handleFilesSubmit={handleFileSubmit} />
						</>
					)}
				</div>
				<div className='flex-child'>
					<div className='files'>
						{!!photos && photos.length !== 0 &&
							<Slideshow photos={photos} updatePhotos={updatePhotos} />
						}
						<ImageUpload onImageSelect={handleImageSelection} />
						<FileUpload onFileSelect={handleFileSelection} />
						{!!files && files.length !== 0 &&
							<FileList files={files} />
						}
					</div>
				</div>
			</div>
		</div>
	);
}

export default MaterialForm;
