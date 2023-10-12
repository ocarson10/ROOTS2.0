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
        from: 'ianmck2101@gmail.com',
        to: 'hnwallac@ncsu.edu', // Replace with the recipient's email
        subject: 'RNS Test Results',
        text: modelResults,
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

    sendEmail(users.toString());
};

cron.schedule('* * * * *', async () => {
    await testModels();
});