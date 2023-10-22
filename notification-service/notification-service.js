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

    //sendEmail(users.toString());
    sendEmail(await treeChecker());
};

cron.schedule('* * * * *', async () => {
    await testModels();
});

async function treeChecker() {
    let materialBody = ``;
    const currentDate = new Date();
    const materials = [];

    // Commenting this part out for now, will test later

    // materials = await TreeModel.findAll().then((innerRes) => {
    //     res.statusCode = 200;
    //     res.statusMessage = 'OK';
    //     res.send(innerRes);
    //   }).catch((error) => {
    //     console.log("Error in fetching trees: ", error);
    //   });
      
    // materials.forEach(element => {
    //     // If within 3 days of transfer date
    //     const daysForTransfer = element.transferDate - currentDate;

    //     if (daysForTransfer <= 3) {
    //         materialBody += `<li> ${element.materialName} pending transfer. Expected transfer by ${element.transferDate} </li>`
    //     }
    //  });

    materialBody += `<li> {MaterialName} pending transfer. Expected transfer by {expectedTransferDate} </li>`;
    materialBody += `<li> {MaterialName} pending transfer. Expected transfer by {expectedTransferDate} </li>`;
    let materialHeader = `<h2> Tree Materials Needing Transfer </h2>`;
    materialHeader += materialBody;
    return materialHeader;
};