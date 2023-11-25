module.exports = (app) => {
  const Location = require("../models/locations.model");
  let router = require("express").Router();
  const db = require("../database/database");

  //Gets all Locations
  router.get("/", async (req, res) => {
    await Location.findAll()
      .then((innerRes) => {
        res.statusCode = 200;
        res.statusMessage = "OK";
        res.send(innerRes);
      })
      .catch((error) => {
        console.log("Error in fetching locations: ", error);
      });
  });

  //Gets a location by name
  router.get("/:location", async (req, res) => {
    const reqLocation = req.params.location;
    await Location.findOne({ where: { location: reqLocation } })
      .then((innerRes) => {
        res.statusCode = 200;
        res.statusMessage = "OK";
        res.send(innerRes);
      })
      .catch((error) => {
        console.log("Error in fetching location: ", error);
      });
  });

  // Posts a location to the database
  router.post("/", async (req, res) => {
    const reqLocation = req.body.location;
    const reqShorthand = req.body.shorthand;

    await db.sync().then(async () => {
      await Location.create({
        location: reqLocation,
        shorthand: reqShorthand,
        active: true,
      })
        .then((innerRes) => {
          res.sendStatus(200);
        })
        .catch((error) => {
          console.log("Error Inserting Record: ", error);
          res.sendStatus(400);
        });
    });
  });

  //delete a location
  router.delete("/", async (req, res) => {
    const deleted = req.body.location;
    const loc = await Location.findOne({ where: { location: deleted } });
    if (loc) {
      loc.destroy();
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  });

  //edit a location
  router.put("/edit/:location", async (req, res) => {
    console.log("loc: " + req.body.location);
    const reqLocation = req.body.location;
    const reqShorthand = req.body.shorthand;
 
    const location = await Location.findOne({ where: { location: reqLocation }});
    if(location) {
      location.update({location: reqLocation, shorthand: reqShorthand});
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }

  });

  // updates a location as inactive/active
  router.put('/:id', async (req, res) => {
    // console.log("location test 1:", req.body.location);
    // console.log("location test 2:", req.params.location);
    // console.log("location test 3:", req.params.id);
    
      //const reqLocation = req.body.location;
      const reqLocation = req.params.id;
      const location = await Location.findOne({ where: { location: reqLocation } });
  
      if (location) {
        // Update the 'active' property
        await location.update({ active: !location.active });
  
        // Respond with a success status
        res.sendStatus(200);
      } else {
        // Location not found, respond with a 404 status
        res.sendStatus(404);
      }
   
    });
  
  app.use("/locations", router);
};
