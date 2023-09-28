module.exports = (app) => {
    const Photo = require('../models/photo.model');
    let router = require('express').Router();
    const db = require('../database/database');

    // Retrieve all photos associated with material
    router.get('/:geneticId', async (req, res) => {
        const geneticId = req.params.geneticId;
        await Photo.findAll({ 
          where: { 
              associatedMaterial: geneticId
          } 
        }).then((innerRes) => {
          if(innerRes) {
            res.statusCode = 200;
            res.statusMessage = 'OK';
            res.send(innerRes);
          } else {
            res.sendStatus(404);
          }
        }).catch((error) => {
          console.log("Unexpected Error in retrieving photos. ", error);
          res.send(500);
        })
    });

    // Add photo to material
    router.post('/', async (req, res) => {
        const reqMaterialGeneticId = req.body.materialGeneticId;
        const reqPhotoData = req.body.photoData;
    
        await db.sync().then(async() => {
          await Photo.create({
            photoData: reqPhotoData,
            associatedMaterial: reqMaterialGeneticId,
          }).then((innerRes) => {
            res.statusCode = 200;
            res.statusMessage = 'OK';
            res.send(innerRes);
          }).catch((error) => {
            console.log("Error Inserting Photo: ", error);
            res.sendStatus(400);
          })
        })
    });

    // Delete a photo from the database
    router.delete('/:id', async (req, res) => {
        const reqPhotoID = req.params.id;
        const photo = await Photo.findOne({ where: { photoId: reqPhotoID } });
        if (photo) {
            photo.destroy();
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });

    app.use('/photos', router);
}