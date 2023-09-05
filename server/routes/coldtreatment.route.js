module.exports = (app) => {

    const ColdTreatment = require('../models/coldtreatment.model');
    let router = require('express').Router();
    const db = require('../database/database');

    //Get all cold treatments
    router.get('/', async (req, res) => {
        await ColdTreatment.findAll().then((innerRes) => {
            res.statusCode = 200;
            res.statusMessage = 'OK';
            res.send(innerRes);
        }).catch((error) => {
            console.log("Error in fetching cold treatments: ", error);
        })
    });

    // Posts a cold treatment to the database
    router.post('/', (req, res) => {
        const reqId = req.body.coldTreatmentId;
        const reqNumberEmbryos = req.body.numberEmbryos;
        const reqDateCold = req.body.dateCold;
        const reqDuration = req.body.duration;
        const reqGeneticId = req.body.coldTreatmentGeneticId;
        const reqLocationId = req.body.locationId;

        db.sync().then(() => {
            ColdTreatment.create({
                coldTreatmentId: reqId,
                numberEmbryos: reqNumberEmbryos,
                dateCold: reqDateCold,
                duration: reqDuration,
                active: true,
                coldTreatmentGeneticId: reqGeneticId,
                locationId: reqLocationId
            }).then((innerRes) => {
                res.sendStatus(200);
            }).catch((error) => {
                console.log("Error Inserting Record: ", error);
                res.sendStatus(400);
            })
        })
    });

    // Gets a cold treatment by id
    router.get('/:id', async (req, res) => {
        const reqId = req.params.id;
        const coldTreatment = await ColdTreatment.findOne({ where: { coldTreatmentId: reqId } });
        if (coldTreatment) {
            res.statusCode = 200;
            res.statusMessage = 'OK';
            res.send(coldTreatment);
        } else {
            res.sendStatus(404);
        }
    });

    // Updates a cold treatment by id
    router.put('/:id', async (req, res) => {
        const reqId = req.params.id;
        const coldTreatment = await ColdTreatment.findOne({ where: { coldTreatmentId: reqId } });

        if (coldTreatment) {
            coldTreatment.update({ active: coldTreatment.active? false: true});
            res.sendStatus(200);

        } else {
            res.sendStatus(404);
        }
    });

    router.put('/update/:id', async (req, res) => {
        const reqId = req.params.id;
        const coldTreatment = await ColdTreatment.findOne({ where: { coldTreatmentId: reqId } });

        if (coldTreatment) {

            const reqNumberEmbryos = req.body.numberEmbryos;
            const reqDateCold = req.body.dateCold;
            const reqDuration = req.body.duration;
            const reqGeneticId = req.body.coldTreatmentGeneticId;
            const reqLocationId = req.body.locationId;
            const reqActive = req.body.active;
            const reqColdTreatmentId = req.body.coldTreatmentId;

            if (reqColdTreatmentId == null || reqColdTreatmentId == undefined || reqId == null || reqId == undefined || reqNumberEmbryos == null || reqNumberEmbryos == undefined || reqDateCold == null || reqDateCold == undefined || reqDuration == null || reqDuration == undefined || reqGeneticId == null || reqGeneticId == undefined || reqLocationId == null || reqLocationId == undefined || reqActive == null || reqActive == undefined ) {
                res.sendStatus(400);
                return;
            }
            coldTreatment.update({
                numberEmbryos: req.body.numberEmbryos,
                dateCold: req.body.dateCold,
                duration: req.body.duration,
                coldTreatmentGeneticId: req.body.coldTreatmentGeneticId,
                locationId: req.body.locationId,
                active: req.body.active,
                coldTreatmentId: req.body.coldTreatmentId
            });
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });

    // Deletes a cold treatment by id
    router.delete('/:id', async (req, res) => {
        const reqId = req.params.id;
        const coldTreatment = await ColdTreatment.findOne({ where: { coldTreatmentId: reqId } });

        if (coldTreatment) {
            coldTreatment.destroy();
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });

    app.use('/coldtreatments', router);
};