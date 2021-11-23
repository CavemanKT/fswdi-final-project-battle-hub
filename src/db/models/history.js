'use strict';
const {
  Model
} = require('sequelize');
const historySchema = require('../schema/history')
module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
      History.User = this.belongsTo(models.User)
    }
  };
  const { tableAttributes } = historySchema(sequelize, DataTypes)
  History.init(tableAttributes, {
    sequelize,
    modelName: 'History',
  });
  return History;
};
