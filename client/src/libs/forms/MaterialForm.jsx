import React from "react";
import ImageUpload from "./ImageUpload";
import { useParams } from "react-router-dom";
import TreeMaterial from "./TreeMaterial";
import SeedMaterial from "./SeedMaterial";
import ConeMaterial from "./ConeMaterial";
import MaintenanceForm from "./MaintenanceForm";
import GreenhouseForm from "./GreenhouseForm";
import ColdTreatment from "./ColdTreatmentForm";

function MaterialForm(props) {
	const { material, action } = useParams();

	return (
		<div>
			{material === "trees" && (
				<div>
					<TreeMaterial operation={action}></TreeMaterial>
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
			<ImageUpload></ImageUpload>
		</div>
	);
}

export default MaterialForm;