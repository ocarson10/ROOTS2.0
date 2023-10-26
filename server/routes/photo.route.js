module.exports = (app) => {
    const Photo = require('../models/photo.model');
    const GeneticId = require('../models/genetic-id.model');
    let router = require('express').Router();
    const db = require('../database/database');
    const util = require('util');
    const multer = require('multer');
    const upload = multer({ dest: 'uploads/' }); // Configure multer to save files in the "uploads" directory

    async function ensureGeneticIdExists(geneticId) {
      const innerRes = await GeneticId.findOne({ where: { geneticId } });
      if (innerRes) {
        return true;
      }
      return false;
    }

    // Retrieve all photos associated with material
    router.get('/:geneticId', async (req, res) => {
      const geneticId = req.params.geneticId;
      const genExist = await ensureGeneticIdExists(geneticId);
      if (genExist) {
        Photo.findAll({ 
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
        });
      } else {
        console.log("GeneticId: " + geneticId + " not found");
        res.sendStatus(404);
      }
    });
    

    // Add photo to material
    router.post('/', async (req, res) => {
      try {
        const { geneticId, photoData } = req.body;
    
        if (!geneticId || !photoData) {
          return res.status(400).json({ error: 'Missing geneticId or photoData' });
        }
    
        const photo = await Photo.create({
          associatedMaterial: geneticId,
          photoData,
        });
    
        res.status(200).json(photo);
      } catch (error) {
        console.error("Error Inserting Photo: ", error);
        res.status(500).json({ error: 'Internal server error' });
      }
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