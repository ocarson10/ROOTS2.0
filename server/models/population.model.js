const {Sequelize, DataTypes} = require('sequelize');

const sequelize = require("../database/database");

const Population = sequelize.define("population", {
  id: {
    primaryKey: true,
    type: DataTypes.STRING(9),
  }
}, {timestamps: false});

module.exports = Population;
