module.exports = (app) => {
  const Ramet = require('../models/ramet.model');
  let router = require('express').Router();
  const db = require('../database/database');

  //Gets all Ramets
  router.get('/', async (req, res) => {
    Ramet.findAll().then((innerRes) => {
      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.send(innerRes);
    }).catch((error) => {
      console.log("Error in fetching ramets: ", error);
    })
  });

  // Get a single Ramet
  router.get('/:id', async (req, res) => {
    const reqRametId = req.params.id;
    Ramet.findOne({ where: { id: reqRametId } }).then((innerRes) => {
      if(innerRes) {
        res.statusCode = 200;
        res.statusMessage = 'OK';
        res.send(innerRes);
      } else {
        res.sendStatus(404);
      }
    }).catch((error) => {
      console.log("Error in fetching ramet: ", error);
      res.send(400);
    })
  });

  // Posts a ramet to the database
  router.post('/', (req, res) => {
    const reqRametId = req.body.id;
    const reqGPS = req.body.gps;
    const reqMotherTreeId = req.body.motherTreeId;
    const reqRametGeneticId = req.body.rametGeneticId;
    const reqLocationId = req.body.locationId;

    db.sync().then(() => {
      Ramet.create({
        id: reqRametId,
        motherTreeId: reqMotherTreeId,
        rametGeneticId: reqRametGeneticId,
        gps: reqGPS,
        locationId: reqLocationId,
        active: true
      }).then((innerRes) => {
        res.sendStatus(200);
      }).catch((error) => {
        console.log("Error Inserting Record: ", error);
        res.sendStatus(400);
      })
    })
  });

  // updates a ramet as inactive/active
  router.put('/:id', async (req, res) => {
    const reqRametId = req.params.id;
    
    Ramet.findOne({ where: { id: reqRametId } }).then((innerRes) => {
      if(innerRes) {
        innerRes.active = !innerRes.active;
        innerRes.save();
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    }).catch((error) => {
      console.log("Error in updating ramet: ", error);
      res.send(400);
    });
  });

  // Deletes a ramet, for testing
  router.delete('/:id', async (req, res) => {
    const reqRametId = req.params.id;
    Ramet.destroy({ where: { id: reqRametId } }).then((innerRes) => {
      if(innerRes) {
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    }).catch((error) => {
      console.log("Error in deleting ramet: ", error);
      res.send(400);
    })
  });
  
  app.use('/ramets', router);
}
