'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MarkDown extends Model {
    static associate(models) {
      // define association here

    }
  };
  MarkDown.init({
    id:   {type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true},
    doctorId: DataTypes.INTEGER,
    contentHTML: DataTypes.TEXT,
    contentMarkDown: DataTypes.TEXT,
    description : DataTypes.TEXT,
    specialtyId :DataTypes.INTEGER,
    clinicId : DataTypes.STRING,
    createdAt : DataTypes.DATE,
    updatedAt : DataTypes.DATE
  }, {
    sequelize,
    modelName: 'markdown',
  });
  return MarkDown;
};