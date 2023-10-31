import React, { useState } from "react";
import "../../libs/style/HomeView.css";
import qricon from "../images/qr-icon.png";
import MaintenanceTab from "../table-tabs/MaintenanceTab";
import TreeTab from "../table-tabs/TreeTab";
import ConeTab from "../table-tabs/ConeTab";
import SeedTab from "../table-tabs/SeedTab";
import RametTab from "../table-tabs/RametTab";
import LocationTab from "../table-tabs/LocationTab";
import SpeciesTab from "../table-tabs/SpeciesTab";
import PopulationTab from "../table-tabs/PopulationTab";
import GeneticIdTab from "../table-tabs/GeneticIdTab";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ArchivedTreeTab from "../table-tabs/archived-tabs/ArchivedTreeTab";
import ArchivedAcclimationTab from "../table-tabs/archived-tabs/ArchivedAcclimationTab";
import ArchivedColdTreatmentTab from "../table-tabs/archived-tabs/ArchivedColdTreatmentTab";
import ArchivedConeTab from "../table-tabs/archived-tabs/ArchivedConeTab";
import ArchivedFieldstationTab from "../table-tabs/archived-tabs/ArchivedFieldstationTab";
import ArchivedGeneticIdTab from "../table-tabs/archived-tabs/ArchivedGeneticIdTab";
import ArchivedGerminationTab from "../table-tabs/archived-tabs/ArchivedGerminationTab";
import ArchivedGreenhouseTab from "../table-tabs/archived-tabs/ArchivedGreenhouseTab";
import ArchivedInitiationTab from "../table-tabs/archived-tabs/ArchivedInitiationTab";
import ArchivedMaintenanceTab from "../table-tabs/archived-tabs/ArchivedMaintenanceTab";
import ArchivedMaturationTab from "../table-tabs/archived-tabs/ArchivedMaturationTab";
import ArchivedRametTab from "../table-tabs/archived-tabs/ArchivedRametTab";
import ArchivedSeedTab from "../table-tabs/archived-tabs/ArchivedSeedTab";
import GreenhouseTab from "../table-tabs/GreenhouseTab";
import GerminationTab from "../table-tabs/GerminationTab";
import MaturationTab from "../table-tabs/MaturationTab";
import InitiationTab from "../table-tabs/InitiationTab";
import AcclimationTab from "../table-tabs/AcclimationTab";
import FieldstationTab from "../table-tabs/FieldstationTab";
import ColdTreatmentTab from "../table-tabs/ColdTreatmentTab";

function HomeView(props) {
  console.log("props: " + JSON.stringify(props));
  const [tableDisplay, setTableDisplay] = useState(<div></div>);
  const [currentFieldTab, setCurrentFieldTab] = useState("Default");
  const [currentLabTab, setCurrentLabTab] = useState("Default");

  const [currentArchiveTab, setCurrentArchiveTab] = useState("Default");

  function showFieldResourceTab(event) {
    setCurrentFieldTab(event.target.value);
    setCurrentLabTab("Default");
    setCurrentArchiveTab("Default");

    let tab = event.target.value;
    if (tab === "Trees") {
      setTableDisplay(
        <div>
          <TreeTab user={props.user}/>
        </div>
      );
    } else if (tab === "Cones") {
      setTableDisplay(
        <div>
          <ConeTab user={props.user}/>
        </div>
      );
    } else if (tab === "Seeds") {
      setTableDisplay(
        <div>
          <SeedTab user={props.user}/>
        </div>
      );
    } else if (tab === "Location") {
      setTableDisplay(<div><LocationTab user={props.user}/></div>);
    } else if (tab === "Genetic ID") {
      setTableDisplay(<div><GeneticIdTab user={props.user}/></div>);
    } else if (tab === "Population") {
      setTableDisplay(<div><PopulationTab user={props.user}/></div>);
    } else if (tab === "Ramet") {
      setTableDisplay(<div><RametTab user={props.user}/></div>);
    } else if (tab === "Species") {
      setTableDisplay(<div><SpeciesTab user={props.user}/></div>)
    } else {
      setTableDisplay(<div></div>);
    }
  }

  function showLabResourceTab(event) {
    setCurrentLabTab(event.target.value);
    setCurrentFieldTab("Default");
    setCurrentArchiveTab("Default");

    let tab = event.target.value;
    if (tab === "Maintenance") {
      setTableDisplay(
        <div>
          <MaintenanceTab user={props.user}/>
        </div>
      );
    } else if (tab === "Greenhouse") {
      setTableDisplay(
        <div>
          <GreenhouseTab user={props.user}/>
        </div>
      );
    } else if (tab === "Cold Treatment") {
      setTableDisplay(<div><ColdTreatmentTab user={props.user}/></div>)
    } else if (tab === "Germination") {
      setTableDisplay(<div><GerminationTab user={props.user}/></div>)
    } else if (tab === "Maturation") {
      setTableDisplay(<div><MaturationTab user={props.user}/></div>)
    } else if (tab === "Initiation") {
      setTableDisplay(<div><InitiationTab user={props.user}/></div>)
    } else if (tab === "Acclimation") {
      setTableDisplay(<div><AcclimationTab user={props.user}/></div>)
    } else if (tab === "Field Station") {
      setTableDisplay(<div><FieldstationTab user={props.user}/></div>)
    } else if (tab === "Location") {
      setTableDisplay(<div><LocationTab user={props.user}/></div>);
    } else if (tab === "Genetic ID") {
      setTableDisplay(<div><GeneticIdTab user={props.user}/></div>);
    } else if (tab === "Population") {
      setTableDisplay(<div><PopulationTab user={props.user}/></div>);
    } else if (tab === "Species") {
      setTableDisplay(<div><SpeciesTab user={props.user}/></div>)
    } else {
      setTableDisplay(<div></div>);
    }
  }

  
  
  // Archive Tabs
  function showArchiveTab(event) {
    setCurrentArchiveTab(event.target.value);
    setCurrentFieldTab("Default");
    setCurrentLabTab("Default");


    var tab = event.target.value;
    if (tab === "Trees Archive") {
      setTableDisplay(
        <div>
          <ArchivedTreeTab user={props.user}/>
        </div>
      );
    } else if (tab === "Cones Archive") {
      setTableDisplay(<div><ArchivedConeTab user={props.user}/></div>)
    } else if (tab === "Seeds Archive") {
      setTableDisplay(<div><ArchivedSeedTab user={props.user}/></div>)
    } else if (tab === "Maintenance Archive") {
      setTableDisplay(<div><ArchivedMaintenanceTab user={props.user}/></div>)
    } else if (tab === "Greenhouse Archive") {
      setTableDisplay(<div><ArchivedGreenhouseTab user={props.user}/></div>)
    } else if (tab === "Cold Treatment Archive") {
      setTableDisplay(<div><ArchivedColdTreatmentTab user={props.user}/></div>)
    } else if (tab === "Germination Archive") {
      setTableDisplay(<div><ArchivedGerminationTab user={props.user}/></div>)
    } else if (tab === "Maturation Archive") {
      setTableDisplay(<div><ArchivedMaturationTab user={props.user}/></div>)
    } else if (tab === "Initiation Archive") {
      setTableDisplay(<div><ArchivedInitiationTab user={props.user}/></div>)
    } else if (tab === "Acclimation Archive") {
      setTableDisplay(<div><ArchivedAcclimationTab user={props.user}/></div>)
    } else if (tab === "Field Station Archive") {
      setTableDisplay(<div><ArchivedFieldstationTab user={props.user}/></div>)
    } else if (tab === "Genetic ID Archive") {
      setTableDisplay(<div><ArchivedGeneticIdTab user={props.user}/></div>)
    } else if (tab === "Ramet Archive") {
      setTableDisplay(<div><ArchivedRametTab user={props.user}/></div>)
    } else {
      setTableDisplay(<div></div>);
    }
  }

  function goToQR() {
    window.location.href = "/qr/read";
  }

  return (
    <div className="main-div">
      <div className="content-div">
        <h1 className="roots-header">ROOTS - Research Operation Organization and Tracking System</h1>
        <div className="search-div">
          <input
            id="search-bar"
            type="text"
            placeholder="Enter search term..."
          />

          <button id="search-button">Search</button>
          <input type="image" src={qricon} alt="qr-button" id="qr-button" onClick={goToQR}/>
        </div>

        <div className="tabs-div">
          
          <div className="fielddropdown" id="field-dropdown">
            <FormControl className="drop-form"  variant="standard">

              <Select
                className="select"
                label="Select Active Field Resource"
                onChange={showFieldResourceTab}
                value={currentFieldTab}
              >
                <MenuItem className="drop-buton" value="Default">
                Select Active Field Resource
                </MenuItem>
                <MenuItem className="drop-button" value="Trees">
                  Trees
                </MenuItem>
                <MenuItem className="drop-button" value="Cones">
                  Cones
                </MenuItem>
                <MenuItem className="drop-button" value="Seeds">
                  Seeds
                </MenuItem>
                <MenuItem className="drop-button" value="Ramet">
                  Ramet
                </MenuItem>
                <MenuItem className="drop-button" value="Location">
                  Location
                </MenuItem>
                <MenuItem className="drop-button" value="Genetic ID">
                  Genetic ID
                </MenuItem>
                <MenuItem className="drop-button" value="Population">
                  Population
                </MenuItem>
                <MenuItem className="drop-button" value="Species">
                  Species
                </MenuItem>
              </Select>
            </FormControl>
          </div>

          <div className="labdropdown" id="lab-dropdown">
            <FormControl className="drop-form"  variant="standard">
              <Select
                className="select"
                label="Select Active Lab Resource"
                onChange={showLabResourceTab}
                value={currentLabTab}
              >
                <MenuItem className="drop-button" value="Default">
                Select Active Lab Resource
                </MenuItem>
                <MenuItem className="drop-button" value="Maintenance">
                  Maintenance
                </MenuItem>
                <MenuItem className="drop-button" value="Greenhouse">
                  Greenhouse
                </MenuItem>
                <MenuItem className="drop-button" value="Cold Treatment">
                  Cold Treatment
                </MenuItem>
                <MenuItem className="drop-button" value="Germination">
                  Germination
                </MenuItem>
                <MenuItem className="drop-button" value="Maturation">
                  Maturation
                </MenuItem>
                <MenuItem className="drop-button" value="Initiation">
                  Initiation
                </MenuItem>
                <MenuItem className="drop-button" value="Acclimation">
                  Acclimation
                </MenuItem>
                <MenuItem className="drop-button" value="Field Station">
                  Field Station
                </MenuItem>
                <MenuItem className="drop-button" value="Location">
                  Location
                </MenuItem>
                <MenuItem className="drop-button" value="Genetic ID">
                  Genetic ID
                </MenuItem>
                <MenuItem className="drop-button" value="Population">
                  Population
                </MenuItem>
                <MenuItem className="drop-button" value="Species">
                  Species
                </MenuItem>
              </Select>
            </FormControl>
  </div>

          <div className="dropdown" id="archived-dropdown">
            <FormControl className="drop-form"  variant="standard">
              <Select
                className="select"
                label="Select Archived Data"
                onChange={showArchiveTab}
                value={currentArchiveTab}
              >
                <MenuItem className="drop-button" value="Default">
                Select Archived Data
                </MenuItem>
                <MenuItem className="drop-button" value="Trees Archive">
                  Trees Archive
                </MenuItem>
                <MenuItem className="drop-button" value="Cones Archive">
                  Cones Archive
                </MenuItem>
                <MenuItem className="drop-button" value="Seeds Archive">
                  Seeds Archive
                </MenuItem>
                <MenuItem className="drop-button" value="Maintenance Archive">
                  Maintenance Archive
                </MenuItem>
                <MenuItem className="drop-button" value="Greenhouse Archive">
                  Greenhouse Archive
                </MenuItem>
                <MenuItem className="drop-button" value="Cold Treatment Archive">
                  Cold Treatment Archive
                </MenuItem>
                <MenuItem className="drop-button" value="Germination Archive">
                  Germination Archive
                </MenuItem>
                <MenuItem className="drop-button" value="Maturation Archive">
                  Maturation Archive
                </MenuItem>
                <MenuItem className="drop-button" value="Initiation Archive">
                  Initiation Archive
                </MenuItem>
                <MenuItem className="drop-button" value="Acclimation Archive">
                  Acclimation Archive
                </MenuItem>
                <MenuItem className="drop-button" value="Field Station Archive">
                  Field Station Archive
                </MenuItem>
                <MenuItem className="drop-button" value="Ramet Archive">
                  Ramet Archive
                </MenuItem>
              </Select>
            </FormControl>
          </div>

        </div>

        {tableDisplay}
        
      </div>
    </div>
  );
}

export default HomeView;