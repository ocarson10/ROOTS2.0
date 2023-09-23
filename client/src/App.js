import React, { useState, useEffect } from "react";
import axios from "axios";
import {instance} from './libs/services/api-client/apiClient';
import "./App.css";
import Login from "./libs/login/Login";
import SeedMaterial from "./libs/forms/SeedMaterial";
import LocationForm from "./libs/forms/LocationForm";
import SpeciesForm from "./libs/forms/SpeciesForm";
import Header from "./libs/page-content/Header";
import Home from "./libs/home/HomeView";
import ConeMaterial from "./libs/forms/ConeMaterial";
import TreeMaterial from "./libs/forms/TreeMaterial";
import PopulationForm from "./libs/forms/PopulationForm";
import GeneticIdForm from "./libs/forms/GeneticIdForm";

import RametForm from "./libs/forms/RametForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InitiationForm from "./libs/forms/InitiationForm";
import MaintenanceForm from "./libs/forms/MaintenanceForm";
import MaturationForm from "./libs/forms/MaturationForm";
import ColdTreatmentForm from "./libs/forms/ColdTreatmentForm";
import MaterialForm from "./libs/forms/MaterialForm";

import Report from "./libs/reports/Report";
import GreenhouseForm from "./libs/forms/GreenhouseForm";
import GerminationForm from "./libs/forms/GerminationForm";
import AcclimationForm from "./libs/forms/AcclimationForm";
import FieldstationForm from "./libs/forms/FieldstationForm";

import QRCodeReader from "./libs/qr/QRCodeReader";
import Invalid from "./libs/invalid/Invalid";
import UserManagement from "./libs/admin/UserManagement/UserManagement";
import Logs from "./libs/admin/Logs/Logs";

// MUI PRO
import { LicenseInfo } from "@mui/x-license-pro";
LicenseInfo.setLicenseKey(
  "962f492b63bc42efaa1912e1c879212cTz02MzgzOSxFPTE3MTI1MDY2MzYxODMsUz1wcm8sTE09c3Vic2NyaXB0aW9uLEtWPTI="
);

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    try {
      instance.get("/users/current").then((response) => {
        setUser(response.data);
      });
    } catch (error) {
      console.log('Error finding current user.\n' + error);
    }
  }, []);

  console.log("user: ", user);
  return (
    <Router>
      {user ? (
        <>
          <Header user={user} />
          <Routes>
            <Route path="/" element={<Home user={user} />} />

            <Route
              path="/material/:material/:action"
              element={<MaterialForm/>}
            />

            <Route
              path="/add/seed-material"
              element={<SeedMaterial operation="Add" />}
            />
            <Route
              path="/edit/seed-material/:id"
              element={<SeedMaterial operation="Edit" />}
            />
            <Route
              path="/propagate/seed-material/:id"
              element={<InitiationForm operation="Add" prop="Yes"/>}
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/add/location"
              element={<LocationForm operation="Add" />}
            />
            <Route
              path="/edit/location/:location"
              element={<LocationForm operation="Edit" />}
            />
            <Route path="/add/species" element={<SpeciesForm />} />
            <Route
              path="/add/cone-material"
              element={<ConeMaterial operation="Add" />}
            />
            <Route
              path="/edit/cone-material/:id"
              element={<ConeMaterial operation="Edit" />}
            />
            <Route
              path="/add/tree-material"
              element={<TreeMaterial operation="Add" />}
            />
            <Route
              path="/edit/tree-material/:id"
              element={<TreeMaterial operation="Edit" />}
            />
            <Route path="/add/population" element={<PopulationForm />} />
            <Route path="/add/genetic-id" element={<GeneticIdForm />} />
            <Route path="/add/initiation" element={<InitiationForm operation="Add"/>} />
            <Route path="/edit/initiation/:id" element={<InitiationForm operation="Edit"/>} />
            <Route path="/propagate/initiation/:id" element={<MaintenanceForm operation="Add" prop="Yes"/>} />
            <Route path="/add/maintenance" element={<MaintenanceForm operation="Add" />} />
            <Route path="/edit/maintenance/:id" element={<MaintenanceForm operation="Edit" />} />
            <Route path="/propagate/maintenance/:id" element={<MaturationForm operation="Add" prop="Yes"/>} />
            <Route path="/add/maturation" element={<MaturationForm operation="Add"/>} />
            <Route path="/edit/maturation/:id" element={<MaturationForm operation="Edit" />} />
            <Route path="/propagate/maturation/:id" element={<ColdTreatmentForm operation="Add" prop="Yes"/>} />
            <Route path="/add/cold-treatment" element={<ColdTreatmentForm operation="Add"/>} />
            <Route path="/edit/cold-treatment/:id" element={<ColdTreatmentForm operation="Edit" />} />
            <Route path="/propagate/cold-treatment/:id" element={<GerminationForm operation="Add" prop="Yes"/>} />
            <Route path="/add/germination" element={<GerminationForm operation="Add"/>} />
            <Route path="/edit/germination/:id" element={<GerminationForm operation="Edit" />}  />
            <Route path="/propagate/germination/:id" element={<AcclimationForm operation="Add" prop="Yes"/>} />
            <Route path="/add/acclimation" element={<AcclimationForm operation="Add"/>} />
            <Route path="/edit/acclimation/:id" element={<AcclimationForm operation="Edit" />} />
            <Route path="/propagate/acclimation/:id" element={<GreenhouseForm operation="Add" prop="Yes"/>} />
            <Route path="/add/greenhouse" element={<GreenhouseForm operation="Add"/>} />
            <Route path="/edit/greenhouse/:id" element={<GreenhouseForm operation="Edit" />} />
            <Route path="/propagate/greenhouse/:id" element={<FieldstationForm operation="Add" prop="Yes"/>} />
            <Route path="/add/fieldstation" element={<FieldstationForm operation="Add"/>} />
            <Route path="/edit/fieldstation/:id" element={<FieldstationForm operation="Edit" />} />
            <Route path="/add/ramet-material/" element={<RametForm />} />
            <Route path="/report/:type/:id/" element={<Report />} />
            <Route path="/qr/read" element={<QRCodeReader />} />
            <Route
              path="/user-management"
              element={<UserManagement user={user} />}
            />
            <Route path="/logs" element={<Logs user={user} />} />
            <Route path="/invalid" element={<Invalid />} />
            <Route path="*" element={<Invalid />} />
          </Routes>
        </>
      ) : (
        <>
          <Header />
          <Routes>
            <Route path="*" exact={true} element={<Invalid />} />
          </Routes>
        </>
      )}
    </Router>
  );
}

export default App;
