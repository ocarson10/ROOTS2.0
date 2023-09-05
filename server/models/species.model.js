const {Sequelize, DataTypes} = require('sequelize');

const sequelize = require("../database/database");

const Species = sequelize.define("species", {
  species: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  shorthand: {
    type: DataTypes.STRING
  }
}, {timestamps: false})

module.exports = Species;
