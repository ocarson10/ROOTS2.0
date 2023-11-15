module.exports = (app) => {
  const Species = require('../models/species.model');
  let router = require('express').Router();
  const db = require('../database/database');

  //Gets all Species
  router.get('/', async (req, res) => {
    await Species.findAll().then((innerRes) => {
      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.send(innerRes);
    }).catch((error) => {
      console.log("Error in fetching species: ", error);
    })
  });

  //Gets a specific species by name
  router.get("/:species", async (req, res) => {
    const reqSpecies = req.params.species;
    await Species.findOne({ where: { species: reqSpecies } })
      .then((innerRes) => {
        res.statusCode = 200;
        res.statusMessage = "OK";
        res.send(innerRes);
      })
      .catch((error) => {
        console.log("Error in fetching species: ", error);
      });
  });

  // Posts a species to the database
  router.post('/', async (req, res) => {
    const reqSpecies = req.body.species;
    const reqShorthand = req.body.shorthand;

    await db.sync().then( async() => {
      await Species.create({
        species: reqSpecies,
        shorthand: reqShorthand,
      }).then((innerRes) => {
        res.sendStatus(200);
      }).catch((error) => {
        console.log("Error Inserting Record: ", error);
        res.sendStatus(400);
      })
    })
  });

  //edit a species
  router.put("/", async (req, res) => {
    const reqCurrentSpecies = req.body.currentSpeciesName;
    const reqSpecies = req.body.species;
    const reqShorthand = req.body.shorthand;

    console.log("current: " + reqCurrentSpecies);
    console.log("new name: " + reqSpecies);
    console.log("new sh: " + reqShorthand);


    await db.sync().then(async () => {
      await Species.update(
        {
          species: reqSpecies,
          shorthand: reqShorthand,
        },
        {
          where: {
            species: reqCurrentSpecies,
          },
        }
      )
        .then((innerRes) => {
          res.sendStatus(200);
        })
        .catch((error) => {
          console.log("Error Inserting Record: ", error);
          res.sendStatus(400);
        });
    });
  });

  // Delete a speecies from the database
  router.delete('/', async (req, res) => {
    const deleted = req.body.species;
    const spec = await Species.findOne({ where: { species: deleted } });
    if (spec) {
      spec.destroy();
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });

  app.use('/species', router);
}
