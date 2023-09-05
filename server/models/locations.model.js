const {Sequelize, DataTypes} = require('sequelize');

const sequelize = require("../database/database");

const Location = sequelize.define("location", {
  location: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  shorthand: {
    type: DataTypes.STRING
  }
}, {timestamps: false});

module.exports = Location;
