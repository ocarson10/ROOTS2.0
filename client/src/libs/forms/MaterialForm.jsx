import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import { useParams } from "react-router-dom";
import TreeMaterial from "./TreeMaterial";
import SeedMaterial from "./SeedMaterial";
import ConeMaterial from "./ConeMaterial";
import MaintenanceForm from "./MaintenanceForm";
import GreenhouseForm from "./GreenhouseForm";
import ColdTreatment from "./ColdTreatmentForm";
import "../../libs/style/Material.css";
import { addPhoto, getPhoto } from "../services/api-client/photoService";
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
				{material === "trees" && (
					<div>
						<TreeMaterial operation={action} sendGeneticIdToParent={getGeneticIdFromChild} treeId={id}/>
					</div>
				)}
				{material === "seeds" && (
					<div>
						<SeedMaterial operation={action} seedId={id}/>
					</div>
				)}
				{material === "cones" && (
					<div>
						<ConeMaterial operation={action} cpneId={id}/>
					</div>
				)}
				{material === "maintenance" && (
					<div>
						<MaintenanceForm operation={action} maintenanceId={id}/>
					</div>
				)}
				{material === "greenhouse" && (
					<div>
						<GreenhouseForm operation={action} greenhouseId={id}/>
					</div>
				)}
				{material === "cold-treatment" && (
					<div>
						<ColdTreatment operation={action} coldTreatmentId={id}/>
					</div>
				)}
			</div>
			<ImageUpload onImageSelect={handleImageSelection}></ImageUpload>
			{geneticId && <button onClick={submitPhoto}></button> }
		</div>
	);
}

export default MaterialForm;
