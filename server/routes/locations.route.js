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
  router.put("/", async (req, res) => {
    console.log("current loc: " + req.body.currentLocationName);
    console.log("loc: " + req.body.location);
    const reqCurrentLocation = req.body.currentLocationName;
    const reqLocation = req.body.location;
    const reqShorthand = req.body.shorthand;
    // const loc = await Location.findOne({ where: { location: reqCurrentLocation } });
    // if (loc) {
    //   console.log("Location found")
    //   loc.update({
    //     location: reqLocation,
    //     shorthand: reqShorthand
    //   });
    //   res.sendStatus(200);
    // } else {
    //   console.log("Location not found")
    //   res.sendStatus(404);
    // }

    await db.sync().then(async () => {
      await Location.update(
        {
          location: reqLocation,
          shorthand: reqShorthand,
        },
        {
          where: {
            location: reqCurrentLocation,
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

  app.use("/locations", router);
};
