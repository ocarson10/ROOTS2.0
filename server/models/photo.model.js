const {DataTypes} = require('sequelize');

const sequelize = require("../database/database");

const GeneticId = require('./genetic-id.model');

const Photo = sequelize.define("photo", {
  photoId: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  photoData: {
    type: DataTypes.BLOB,
  },
  associatedMaterial: {
    foreignKey: GeneticId,
  }
}, {timestamps: false});

Photo.hasOne(GeneticId, {
  foreignKey: "materialGeneticId"
});

GeneticId.hasMany(Photo, {
  foreignKey: "materialGeneticId"
})

module.exports = Photo;