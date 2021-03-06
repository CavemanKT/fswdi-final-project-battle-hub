const {
  Model
} = require('sequelize')

const profileSchema = require('../schema/profile')

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.User = this.belongsTo(models.User)
      Profile.Histories = this.hasMany(models.History)
      Profile.OwnedInvitations = this.hasMany(models.Invitation, { as: 'OwnerProfile', foreignKey: 'profile1' })
      Profile.ReceivedInvitations = this.hasMany(models.Invitation, { as: 'ReceiverProfile', foreignKey: 'profile2' })
    }
  }
  const { tableAttributes } = profileSchema(sequelize, DataTypes)
  Profile.init(tableAttributes, {
    sequelize,
    modelName: 'Profile'
  })
  return Profile
}
