'use strict';
const {
  Model
} = require('sequelize');
const invitationSchema = require('../schema/invitation')
module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    static associate(models) {
      Invitation.Profile = this.belongsTo(models.Profile)
    }
  };

  const { tableAttributes } = invitationSchema(sequelize, DataTypes)
  Invitation.init(tableAttributes, {
    sequelize,
    modelName: 'Invitation',
  });
  return Invitation;
};
