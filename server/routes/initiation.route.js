module.exports = (app) => {

    const Initiation = require('../models/initiation.model');
    let router = require('express').Router();
    const db = require('../database/database');

    //Get all initiations
    router.get('/', async (req, res) => {
        await Initiation.findAll().then((innerRes) => {
            res.statusCode = 200;
            res.statusMessage = 'OK';
            res.send(innerRes);
        }).catch((error) => {
            console.log("Error in fetching initiations: ", error);
        })
    });

    // Posts a initiation to the database
    router.post('/', (req, res) => {
        const reqId = req.body.initiationId;
        const seedsAndEmbryos = req.body.seedsAndEmbryos;
        const reqMediaBatch = req.body.mediaBatch;
        const numberOfPlates = req.body.numberOfPlates;
        const reqDateMade = req.body.dateMade;
        const reqGeneticId = req.body.initiationGeneticId;
        const reqLocationId = req.body.locationId;

        db.sync().then(() => {
            Initiation.create({
                initiationId: reqId,
                seedsAndEmbryos: seedsAndEmbryos,
                mediaBatch: reqMediaBatch,
                dateMade: reqDateMade,
                active: true,
                initiationGeneticId: reqGeneticId,
                locationId: reqLocationId,
                numberOfPlates: numberOfPlates
            }).then((innerRes) => {
                res.sendStatus(200);
            }).catch((error) => {
                console.log("Error Inserting Record: ", error);
                res.sendStatus(400);
            })
        })
    });

    // Gets a initiation by id
    router.get('/:id', async (req, res) => {
        const reqId = req.params.id;
        const initiation = await Initiation.findOne({ where: { initiationId: reqId } });
        if (initiation) {
            res.statusCode = 200;
            res.statusMessage = 'OK';
            res.send(initiation);

        } else {
            res.sendStatus(404);
        }
    });

    // Updates a initiation by id
    router.put('/:id', async (req, res) => {
        const reqId = req.params.id;
        const initiation = await Initiation.findOne({ where: { initiationId: reqId } });
        
        if (initiation) {
            initiation.update({active: initiation.active ? false : true});
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });

    router.put('/edit/:id', async (req, res) => {
        const reqId = req.params.id;
        const initiation = await Initiation.findOne({ where: { initiationId: reqId } });

        if (initiation) {
            const reqId = req.body.initiationId;
            const seedsAndEmbryos = req.body.seedsAndEmbryos;
            const reqMediaBatch = req.body.mediaBatch;
            const numberOfPlates = req.body.numberOfPlates;
            const reqDateMade = req.body.dateMade;
            const reqGeneticId = req.body.initiationGeneticId;
            const reqLocationId = req.body.locationId;
            const reqActive = req.body.active;

            if (reqId == null || reqId == undefined || seedsAndEmbryos == null || seedsAndEmbryos == undefined || reqMediaBatch == null || reqMediaBatch == undefined || numberOfPlates == null || numberOfPlates == undefined || reqDateMade == null || reqDateMade == undefined || reqGeneticId == null || reqGeneticId == undefined || reqLocationId == null || reqLocationId == undefined || reqActive == null || reqActive == undefined) {
                res.sendStatus(400);
                return;
            }
            initiation.update({
                initiationId: reqId,
                seedsAndEmbryos: seedsAndEmbryos,
                mediaBatch: reqMediaBatch,
                dateMade: reqDateMade,
                active: reqActive,
                initiationGeneticId: reqGeneticId,
                locationId: reqLocationId,
                numberOfPlates: numberOfPlates
            });
            res.sendStatus(200);

        } else {
            res.sendStatus(404);
        }
    });


    // Deletes a initiation by id
    router.delete('/:id', async (req, res) => {
        const reqId = req.params.id;
        const initiation = await Initiation.findOne({ where: { initiationId: reqId } });
        if (initiation) {
            initiation.destroy();
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });

    app.use('/initiations', router);
}