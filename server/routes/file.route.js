module.exports = (app) => {
    const File = require('../models/file.model');
    const GeneticId = require('../models/genetic-id.model');
    let router = require('express').Router();
    const db = require('../database/database');
    const util = require('util');
    const multer = require('multer');
    const upload = multer({ dest: 'uploads/' }); // Configure multer to save files in the "uploads" directory

    async function ensureGeneticIdExists(geneticId) {
      const innerRes = await GeneticId.findOne({ where: { id: geneticId } });
      if (innerRes) {
        return true;
      }
      return false;
    }

    // Retrieve all file associated with material
    router.get('/:geneticId', async (req, res) => {
      const geneticId = req.params.geneticId;
      const genExist = await ensureGeneticIdExists(geneticId);
      if (genExist) {
        File.findAll({ 
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
          console.log("Unexpected Error in retrieving files. ", error);
          res.send(500);
        });
      } else {
        console.log("GeneticId: " + geneticId + " not found");
        res.sendStatus(404);
      }
    });
    

    // Add file to material
    router.post('/', async (req, res) => {
      try {
        const { geneticId, fileData } = req.body;
    
        if (!geneticId || !fileData) {
          return res.status(400).json({ error: 'Missing geneticId or fileData' });
        }
    
        const file = await File.create({
          associatedMaterial: geneticId,
          fileData,
        });
    
        res.status(200).json(file);
      } catch (error) {
        console.error("Error Inserting File: ", error);
        res.status(500).json({ error: 'Internal server error' });
      }
    });
    

    // Delete a file from the database
    router.delete('/:id', async (req, res) => {
        const reqFileID = req.params.id;
        const file = await File.findOne({ where: { fileId: reqFileID } });
        if (file) {
            file.destroy();
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });

    app.use('/files', router);
}
