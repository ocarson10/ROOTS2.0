const {DataTypes} = require('sequelize');

const sequelize = require("../database/database");

const GeneticId = require('./genetic-id.model');

const Photo = sequelize.define("photos", {
  photoId: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  photoData: {
    type: DataTypes.BLOB,
  },
  associatedMaterial: {
    type: DataTypes.INTEGER,
  }
}, {timestamps: false});

Photo.hasOne(GeneticId, {
  foreignKey: "associatedMaterialGeneticId"
});

GeneticId.belongsTo(Photo, {
  foreignKey: "associatedMaterialGeneticId"
});

GeneticId.hasMany(Photo, {
  foreignKey: "associatedPhotoIds"
});

Photo.belongsTo(GeneticId, {
  foreignKey: "associatedPhotoIds"
});

module.exports = Photo;