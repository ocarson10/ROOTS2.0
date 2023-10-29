import React, { useState } from 'react';
import ImageUpload from './ImageUpload';
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
import '../../libs/style/Material.css';
import { addPhoto, getPhoto } from '../services/api-client/photoService';
function MaterialForm(props) {
	const { material, action, id } = useParams();
	const [geneticId, setGeneticId] = useState(null);
	const [selectedImage, setSelectedImage] = useState(null);
	const getGeneticIdFromChild = (data) => {
		setGeneticId(data);
	}
	// Function to receive the selected image from child component
	const handleImageSelection = (image) => {
		setSelectedImage(image);
	};

	const submitPhoto = async () => {
		console.log(geneticId);
		await addPhoto(geneticId, selectedImage.file);
	}

	return (
		<div>
			<div>
				{material == 'acclimation' &&
					<>
						<AcclimationForm operation={action} acclimationId={id} />
					</>
				}
				{material == 'cold-treatment' &&
					<>
						<ColdTreatmentForm operation={action} acclimationId={id} />
					</>
				}
				{material === 'cones' && (
					<>
						<ConeMaterial operation={action} coneId={id}/>
					</>
				)}
				{material === 'fieldstation' && (
					<>
						<FieldstationForm operation={action} fieldstationId={id}/>
					</>
				)}
				{material === 'genetic-id' && (
					<>
						<GeneticIdForm operation={action} geneticId={id}/>
					</>
				)}
				{material === 'germination' && (
					<>
						<GerminationForm operation={action} germinationId={id}/>
					</>
				)}
				{material === 'greenhouse' && (
					<>
						<GreenhouseForm operation={action} greenhouseId={id}/>
					</>
				)}
				{material === 'initiation' && (
					<>
						<InitiationForm operation={action} initiationId={id}/>
					</>
				)}
				{material === 'location' && (
					<>
						<LocationForm operation={action} locationId={id}/>
					</>
				)}
				{material === 'maintenance' && (
					<>
						<MaintenanceForm operation={action} maintenanceId={id}/>
					</>
				)}
				{material === 'maturation' && (
					<>
						<MaturationForm operation={action} maturationId={id}/>
					</>
				)}
				{material === 'population' && (
					<>
						<PopulationForm operation={action} populationId={id}/>
					</>
				)}
				{material === 'ramet-material' && (
					<>
						<RametForm operation={action} rametId={id}/>
					</>
				)}
				{material === 'seeds' && (
					<>
						<SeedMaterial operation={action} seedId={id}/>
					</>
				)}
				{material === 'species' && (
					<>
						<SpeciesForm operation={action} speciesId={id}/>
					</>
				)}
				{material === 'trees' && (
					<>
						<TreeMaterial operation={action} sendGeneticIdToParent={getGeneticIdFromChild} treeId={id}/>
					</>
				)}
			</div>
			<ImageUpload onImageSelect={handleImageSelection}></ImageUpload>
			{geneticId && <button onClick={submitPhoto}></button> }
		</div>
	);
}

export default MaterialForm;
