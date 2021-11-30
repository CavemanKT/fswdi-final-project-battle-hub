const {
  Model
} = require('sequelize')
const invitationSchema = require('../schema/invitation')

module.exports = (sequelize, DataTypes) => {
  class Invitation extends Model {
    static associate(models) {
      Invitation.OwnerProfile = this.belongsTo(models.Profile, { as: 'OwnerProfile', foreignKey: 'profile1' })
      Invitation.ReceiverProfile = this.belongsTo(models.Profile, { as: 'ReceiverProfile', foreignKey: 'profile2' })
      // Invitation.Profiles = this.belongsToMany(models.Profile, { through: 'InvitationProfile' })
      // Invitation.InvitationProfiles = this.hasMany(models.InvitationProfile)
    }
  }

  const { tableAttributes } = invitationSchema(sequelize, DataTypes)
  Invitation.init(tableAttributes, {
    sequelize,
    modelName: 'Invitation'
  })
  return Invitation
}
