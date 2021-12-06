'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DoctorInfo extends Model {
    static associate(models) {
      this.belongsTo(models.Allcode ,{foreignKey:"priceId",as :"priceData"})
      this.belongsTo(models.Allcode ,{foreignKey:"paymentId",as :"paymentData"})
      this.belongsTo(models.Allcode ,{foreignKey:"provinceId",as :"provinceData"})
    }
  };
  DoctorInfo.init({
    // id:   {type: DataTypes.INTEGER,
    //   primaryKey: true,
    //   autoIncrement: true},
    doctorId: DataTypes.INTEGER,
    priceId : DataTypes.STRING ,
    provinceId : DataTypes.STRING ,
    paymentId :DataTypes.STRING ,
    addressClinic : DataTypes.STRING ,
    nameClinic : DataTypes.STRING ,
    note : DataTypes.STRING ,
    count : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DoctorInfo',
  });
  return DoctorInfo;
};