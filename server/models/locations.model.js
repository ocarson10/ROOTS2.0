const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require("../database/database");

const Location = sequelize.define("location", {
  location: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false
  },
  shorthand: {
    type: DataTypes.STRING
  },
  uniqueId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    unique: true
  },
  active: {
        type: DataTypes.BOOLEAN,
    }
}, { timestamps: false });

module.exports = Location;
