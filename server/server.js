const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();

// const origin = "http://localhost:3000";
const origin = "https://localhost/";

app.use(express.json());
const corsOrigin ={
  origin: origin, //or whatever port your frontend is using
  credentials:true,            
  optionSuccessStatus:200
}
app.use(cors(corsOrigin));
app.use(express.urlencoded({ extended: true }));

const db = require('./database/database');
const LocationModel = require('./models/locations.model');
const PopulationModel = require("./models/population.model");
const GeneticIdModel = require("./models/genetic-id.model");
const TreeModel = require("./models/tree.model");
const SpeciesModel = require("./models/species.model");
const RametModel = require("./models/ramet.model");
const ConeModel = require("./models/cone.model");
const SeedModel = require("./models/seed.model");
const InitiationModel = require("./models/initiation.model");
const MaintenanceModel = require("./models/maintenance.model");
const AcclimationModel = require("./models/acclimation.model");
const ColdTreatmentModel = require("./models/coldtreatment.model");
const GerminationModel = require("./models/germination.model");
const FieldStationModel = require("./models/fieldstation.model");
const MaturationModel = require("./models/maturation.model");
const GreenHouseModel = require("./models/greenhouse.model");
const UserModel = require("./models/user.model");
const LogModel = require("./models/log.model");


require('./routes/routes')(app);

async function trySync(models, attempts, options) {
  if (Array.isArray(models)) {
    for (let model of models) {
      try {
        await model.sync(options);
      } catch (e) {
        if (attempts > 0) {
          await trySync(model, attempts - 1);
        } else {
          console.log("Could not sync model", model);
        }
      }
    }
  } else {
    try {
      await models.sync(options);
    } catch (e) {
      if (attempts > 0) {
        await trySync(models, attempts - 1);
      } else {
        console.log("Could not sync model", models);
      }
    }
  }
}

function delay(time) {
  return new Promise(resolve => setTimeout(resolve, time));
} 

module.exports = async function createServer(options) {
  try {
    for(let x = 3; x > 0; x--) {
      try {
        await db.authenticate();
        console.log("Connected!");
        break;
      } catch(error) {
        console.log('Failed to connect, trying again...');
        console.log(error);
        await delay(2000);
      }
    }
    
    // Sync Models
    const models = [LocationModel, PopulationModel, SpeciesModel, GeneticIdModel, TreeModel,
      RametModel, ConeModel, SeedModel, InitiationModel, MaintenanceModel, AcclimationModel, 
      ColdTreatmentModel, GerminationModel, FieldStationModel, MaturationModel, GreenHouseModel, UserModel, LogModel];
    await trySync(models, 3, options);

  }
  catch (error) {
    console.log("Could not connect to the database, ", error.original);
  }
  return app;
}

