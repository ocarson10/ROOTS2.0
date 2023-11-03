async function ensureMaterialIdExists(type, id) {
    const locationModel = require('../models/locations.model');
    const populationModel = require("../models/population.model");
    const treeModel = require("../models/tree.model");
    const speciesModel = require("../models/species.model");
    const rametModel = require("../models/ramet.model");
    const coneModel = require("../models/cone.model");
    const seedModel = require("../models/seed.model");
    const initiationModel = require("../models/initiation.model");
    const maintenanceModel = require("../models/maintenance.model");
    const acclimationModel = require("../models/acclimation.model");
    const coldTreatmentModel = require("../models/coldtreatment.model");
    const germinationModel = require("../models/germination.model");
    const fieldStationModel = require("../models/fieldstation.model");
    const maturationModel = require("../models/maturation.model");
    const greenhouseModel = require("../models/greenhouse.model");

    switch (type) {
        case 'location':
            return await locationModel.findByPk(id) !== null;

        case 'population':
            return await populationModel.findByPk(id) !== null;

        case 'tree':
            return await treeModel.findByPk(id) !== null;

        case 'species':
            return await speciesModel.findByPk(id) !== null;

        case 'ramet-material':
            return await rametModel.findByPk(id) !== null;

        case 'cones':
            return await coneModel.findByPk(id) !== null;

        case 'seed-material':
            return await seedModel.findByPk(id) !== null;

        case 'initiation':
            return await initiationModel.findByPk(id) !== null;

        case 'maintenance':
            return await maintenanceModel.findByPk(id) !== null;

        case 'acclimation':
            return await acclimationModel.findByPk(id) !== null;

        case 'cold-treatment':
            return await coldTreatmentModel.findByPk(id) !== null;

        case 'germination':
            return await germinationModel.findByPk(id) !== null;

        case 'fieldstation':
            return await fieldStationModel.findByPk(id) !== null;

        case 'maturation':
            return await maturationModel.findByPk(id) !== null;

        case 'greenhouse':
            return await greenhouseModel.findByPk(id) !== null;

        default:
            return false;
    }
}

module.exports = { ensureMaterialIdExists };