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

GeneticId.hasMany(Photo, {
  foreignKey: "photoId",
});

Photo.belongsTo(GeneticId, {
  foreignKey: "photoId",
});

module.exports = Photo;