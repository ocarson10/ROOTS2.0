module.exports = (app) => {
  const Population = require('../models/population.model');
  let router = require('express').Router();
  const db = require('../database/database');

  //Gets all Populations
  router.get('/', async (req, res) => {
    await Population.findAll().then((innerRes) => {
      res.statusCode = 200;
      res.statusMessage = 'OK';
      res.send(innerRes);
    }).catch((error) => {
      console.log("Error in fetching populations: ", error);
    })
  });

  // Posts a population to the database
  router.post('/', async (req, res) => {
    const reqPopulation = req.body.id;

    await db.sync().then( async () => {
      await Population.create({
        id: reqPopulation,
      }).then((innerRes) => {
        res.sendStatus(200);
      }).catch((error) => {
        console.log("Error Inserting Record: ", error);
        res.sendStatus(400);
      })
    })
  });

  router.delete('/', async (req, res) => {
    const reqPopulation = req.body.id;
    const pop = await Population.findOne({ where: { id: reqPopulation } });
    if (pop) {
      pop.destroy();
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });

  app.use('/populations', router);
}
