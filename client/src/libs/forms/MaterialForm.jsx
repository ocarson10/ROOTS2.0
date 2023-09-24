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
function MaterialForm(props) {
	const { material, action } = useParams();
	const [geneticId, setGeneticId] = useState(null);
	const getGeneticIdFromChild = (data) => {
		setGeneticId(data);
	}

	return (
		<div>
		
			<div class= "upload-section">
				<h1>File Upload</h1>
				
			</div>
			<div>
				{material === "trees" && (
					<div>
						<TreeMaterial operation={action} sendGeneticIdToParent={getGeneticIdFromChild}></TreeMaterial>
					</div>
				)}
				{material === "seeds" && (
					<div>
						<SeedMaterial operation={action}></SeedMaterial>
					</div>
				)}
				{material === "cones" && (
					<div>
						<ConeMaterial operation={action}></ConeMaterial>
					</div>
				)}
				{material === "maintenance" && (
					<div>
						<MaintenanceForm operation={action}></MaintenanceForm>
					</div>
				)}
				{material === "greenhouse" && (
					<div>
						<GreenhouseForm operation={action}></GreenhouseForm>
					</div>
				)}
				{material === "cold-treatment" && (
					<div>
						<ColdTreatment operation={action}></ColdTreatment>
					</div>
				)}
			</div>
		
			
			
		</div>
	);
}

export default MaterialForm;
