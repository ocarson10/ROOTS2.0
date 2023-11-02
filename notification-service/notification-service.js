const cron = require('node-cron');
const nodemailer = require('nodemailer');

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

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: { //Will replace x and y with the email username & password/app pass for gmail. 
        user: 'x',
        pass: 'y',
    },
});

async function sendEmail(modelResults) {
    const mailOptions = {
        from: 'rusanchez906@gmail.com',
        to: 'rusanchez906@gmail.com', // Replace with the recipient's email
        subject: 'RNS Test Results',
        html: modelResults,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}


async function testModels() {
    console.log('This runs every minute...\n');
    console.log(await UserModel.findAll());

    const users = await UserModel.findAll();
    let currentDate = new Date();

    let emailContent = `<h1 style="text-align:center;"> ${currentDate.toDateString()} - CTG Inventory Report`;
    emailContent += await seedChecker();
    emailContent += await acclimationChecker();
    emailContent += await coldTreatmentChecker();
    emailContent += await germinationChecker();
    emailContent += await greenHouseChecker();
    emailContent += await initiationChecker();
    emailContent += await maintenanceChecker();
    emailContent += await maturationChecker();
    emailContent += await rametChecker();
    emailContent += `<h1 style="text-align:center";>·&lt;|º_º|&gt;·</h1>·`

    //sendEmail(users.toString());
    sendEmail(emailContent);
};

cron.schedule('* * * * *', async () => {
    await testModels();
});

async function seedChecker() {
    let materialBody = ``;
    const currentDate = new Date();
    let materials = [];
    
    try {
        materials = await SeedModel.findAll();
    } catch (e) {
        console.log(`Error Received: ${e}`)
    }

    for (const element of materials) {
        // If within 3 days of transfer date
        const transferDate = new Date(element.transferDate); // Convert to Date
        const daysForTransfer = (transferDate - currentDate) / (1000 * 60 * 60 * 24); // Calculate days
    
        if (daysForTransfer <= 3) {
            let geneticId = await GeneticIdModel.findOne({ where: { id: element.seedGeneticId } });
            let geneticIdName =
                  `P` +
                  geneticId.populationId +
                  `_` +
                  geneticId.familyId +
                  `_` +
                  (geneticId.rametId ? geneticId.rametId : `NA`) +
                  `_` +
                  geneticId.geneticId +
                  `_` +
                  geneticId.progenyId;
            materialBody += `<li> ${geneticIdName} pending transfer. Expected transfer by ${element.transferDate.toDateString()} </li>`;
        }
    }
    
    if (materialBody.length === 0) {
        return ``;
    }

    let materialHeader = `<h2> Seed Materials Needing Transfer </h2>`;
    materialHeader += materialBody;
    return materialHeader;
};

async function acclimationChecker() {
    let materialBody = ``;
    const currentDate = new Date();
    let materials = [];
    
    try {
        materials = await AcclimationModel.findAll();
    } catch (e) {
        console.log(`Error Received: ${e}`)
    }

    for (const element of materials) {
        // If within 3 days of transfer date
        const transferDate = new Date(element.transferDate); // Convert to Date
        const daysForTransfer = (transferDate - currentDate) / (1000 * 60 * 60 * 24); // Calculate days
    
        if (daysForTransfer <= 3) {
            let geneticId = await GeneticIdModel.findOne({ where: { id: element.acclimationGeneticId } });
            let geneticIdName =
                  `P` +
                  geneticId.populationId +
                  `_` +
                  geneticId.familyId +
                  `_` +
                  (geneticId.rametId ? geneticId.rametId : `NA`) +
                  `_` +
                  geneticId.geneticId +
                  `_` +
                  geneticId.progenyId;
            materialBody += `<li> ${geneticIdName} pending transfer. Expected transfer by ${element.transferDate.toDateString()} </li>`;
        }
    }

    if (materialBody.length === 0) {
        return ``;
    }

    let materialHeader = `<h2> Acclimation Materials Needing Transfer </h2>`;
    materialHeader += materialBody;
    return materialHeader;
};

async function coldTreatmentChecker() {
    let materialBody = ``;
    const currentDate = new Date();
    let materials = [];
    
    try {
        materials = await ColdTreatmentModel.findAll();
    } catch (e) {
        console.log(`Error Received: ${e}`)
    }

    for (const element of materials) {
        // If within 3 days of transfer date
        const transferDate = new Date(element.transferDate); // Convert to Date
        const daysForTransfer = (transferDate - currentDate) / (1000 * 60 * 60 * 24); // Calculate days
    
        if (daysForTransfer <= 3) {
            let geneticId = await GeneticIdModel.findOne({ where: { id: element.coldTreatmentGeneticId } });
            let geneticIdName =
                  `P` +
                  geneticId.populationId +
                  `_` +
                  geneticId.familyId +
                  `_` +
                  (geneticId.rametId ? geneticId.rametId : `NA`) +
                  `_` +
                  geneticId.geneticId +
                  `_` +
                  geneticId.progenyId;
            materialBody += `<li> ${geneticIdName} pending transfer. Expected transfer by ${element.transferDate.toDateString()} </li>`;
        }
    }
    
    if (materialBody.length === 0) {
        return ``;
    }

    let materialHeader = `<h2> Cold Treatment Materials Needing Transfer </h2>`;
    materialHeader += materialBody;
    return materialHeader;
};

async function germinationChecker() {
    let materialBody = ``;
    const currentDate = new Date();
    let materials = [];
    
    try {
        materials = await GerminationModel.findAll();
    } catch (e) {
        console.log(`Error Received: ${e}`)
    }

    for (const element of materials) {
        // If within 3 days of transfer date
        const transferDate = new Date(element.transferDate); // Convert to Date
        const daysForTransfer = (transferDate - currentDate) / (1000 * 60 * 60 * 24); // Calculate days
    
        if (daysForTransfer <= 3) {
            let geneticId = await GeneticIdModel.findOne({ where: { id: element.germinationGeneticId } });
            let geneticIdName =
                  `P` +
                  geneticId.populationId +
                  `_` +
                  geneticId.familyId +
                  `_` +
                  (geneticId.rametId ? geneticId.rametId : `NA`) +
                  `_` +
                  geneticId.geneticId +
                  `_` +
                  geneticId.progenyId;
            materialBody += `<li> ${geneticIdName} pending transfer. Expected transfer by ${element.transferDate.toDateString()} </li>`;
        }
    }
    
    if (materialBody.length === 0) {
        return ``;
    }

    let materialHeader = `<h2> Germination Materials Needing Transfer </h2>`;
    materialHeader += materialBody;
    return materialHeader;
};

async function greenHouseChecker() {
    let materialBody = ``;
    const currentDate = new Date();
    let materials = [];
    
    try {
        materials = await GreenHouseModel.findAll();
    } catch (e) {
        console.log(`Error Received: ${e}`)
    }
    
    for (const element of materials) {
        // If within 3 days of transfer date
        const transferDate = new Date(element.transferDate); // Convert to Date
        const daysForTransfer = (transferDate - currentDate) / (1000 * 60 * 60 * 24); // Calculate days
    
        if (daysForTransfer <= 3) {
            let geneticId = await GeneticIdModel.findOne({ where: { id: element.greenhouseGeneticId } });
            let geneticIdName =
                  `P` +
                  geneticId.populationId +
                  `_` +
                  geneticId.familyId +
                  `_` +
                  (geneticId.rametId ? geneticId.rametId : `NA`) +
                  `_` +
                  geneticId.geneticId +
                  `_` +
                  geneticId.progenyId;
            materialBody += `<li> ${geneticIdName} pending transfer. Expected transfer by ${element.transferDate.toDateString()} </li>`;
        }
    }
    
    if (materialBody.length === 0) {
        return ``;
    }

    let materialHeader = `<h2> Greenhouse Materials Needing Transfer </h2>`;
    materialHeader += materialBody;
    return materialHeader;
};

async function initiationChecker() {
    let materialBody = ``;
    const currentDate = new Date();
    let materials = [];
    
    try {
        materials = await InitiationModel.findAll();
    } catch (e) {
        console.log(`Error Received: ${e}`)
    }

    for (const element of materials) {
        // If within 3 days of transfer date
        const transferDate = new Date(element.transferDate); // Convert to Date
        const daysForTransfer = (transferDate - currentDate) / (1000 * 60 * 60 * 24); // Calculate days
    
        if (daysForTransfer <= 3) {
            let geneticId = await GeneticIdModel.findOne({ where: { id: element.initiationGeneticId } });
            let geneticIdName =
                  `P` +
                  geneticId.populationId +
                  `_` +
                  geneticId.familyId +
                  `_` +
                  (geneticId.rametId ? geneticId.rametId : `NA`) +
                  `_` +
                  geneticId.geneticId +
                  `_` +
                  geneticId.progenyId;
            materialBody += `<li> ${geneticIdName} pending transfer. Expected transfer by ${element.transferDate.toDateString()} </li>`;
        }
    }
    
    if (materialBody.length === 0) {
        return ``;
    }

    let materialHeader = `<h2> Initiation Materials Needing Transfer </h2>`;
    materialHeader += materialBody;
    return materialHeader;
};

async function maintenanceChecker() {
    let materialBody = ``;
    const currentDate = new Date();
    let materials = [];
    
    try {
        materials = await MaintenanceModel.findAll();
    } catch (e) {
        console.log(`Error Received: ${e}`)
    }

    for (const element of materials) {
        // If within 3 days of transfer date
        const transferDate = new Date(element.transferDate); // Convert to Date
        const daysForTransfer = (transferDate - currentDate) / (1000 * 60 * 60 * 24); // Calculate days
    
        if (daysForTransfer <= 3) {
            let geneticId = await GeneticIdModel.findOne({ where: { id: element.maintenanceGeneticId } });
            let geneticIdName =
                  `P` +
                  geneticId.populationId +
                  `_` +
                  geneticId.familyId +
                  `_` +
                  (geneticId.rametId ? geneticId.rametId : `NA`) +
                  `_` +
                  geneticId.geneticId +
                  `_` +
                  geneticId.progenyId;
            materialBody += `<li> ${geneticIdName} pending transfer. Expected transfer by ${element.transferDate.toDateString()} </li>`;
        }
    }
    
    if (materialBody.length === 0) {
        return ``;
    }

    let materialHeader = `<h2> Maintenance Materials Needing Transfer </h2>`;
    materialHeader += materialBody;
    return materialHeader;
};

async function maturationChecker() {
    let materialBody = ``;
    const currentDate = new Date();
    let materials = [];
    
    try {
        materials = await MaturationModel.findAll();
    } catch (e) {
        console.log(`Error Received: ${e}`)
    }

    for (const element of materials) {
        // If within 3 days of transfer date
        const transferDate = new Date(element.transferDate); // Convert to Date
        const daysForTransfer = (transferDate - currentDate) / (1000 * 60 * 60 * 24); // Calculate days
    
        if (daysForTransfer <= 3) {
            let geneticId = await GeneticIdModel.findOne({ where: { id: element.maturationGeneticId } });
            let geneticIdName =
                  `P` +
                  geneticId.populationId +
                  `_` +
                  geneticId.familyId +
                  `_` +
                  (geneticId.rametId ? geneticId.rametId : `NA`) +
                  `_` +
                  geneticId.geneticId +
                  `_` +
                  geneticId.progenyId;
            materialBody += `<li> ${geneticIdName} pending transfer. Expected transfer by ${element.transferDate.toDateString()} </li>`;
        }
    }
    
    if (materialBody.length === 0) {
        return ``;
    }

    let materialHeader = `<h2> Maturation Materials Needing Transfer </h2>`;
    materialHeader += materialBody;
    return materialHeader;
};

async function rametChecker() {
    let materialBody = ``;
    const currentDate = new Date();
    let materials = [];
    
    try {
        materials = await RametModel.findAll();
    } catch (e) {
        console.log(`Error Received: ${e}`)
    }

    for (const element of materials) {
        // If within 3 days of transfer date
        const transferDate = new Date(element.transferDate); // Convert to Date
        const daysForTransfer = (transferDate - currentDate) / (1000 * 60 * 60 * 24); // Calculate days
    
        if (daysForTransfer <= 3) {
            let geneticId = await GeneticIdModel.findOne({ where: { id: element.rametGeneticId } });
            let geneticIdName =
                  `P` +
                  geneticId.populationId +
                  `_` +
                  geneticId.familyId +
                  `_` +
                  (geneticId.rametId ? geneticId.rametId : `NA`) +
                  `_` +
                  geneticId.geneticId +
                  `_` +
                  geneticId.progenyId;
            materialBody += `<li> ${geneticIdName} pending transfer. Expected transfer by ${element.transferDate.toDateString()} </li>`;
        }
    }
    
    if (materialBody.length === 0) {
        return ``;
    }

    let materialHeader = `<h2> Ramet Materials Needing Transfer </h2>`;
    materialHeader += materialBody;
    return materialHeader;
};