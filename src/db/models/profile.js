const {
  Model
} = require('sequelize')

const profileSchema = require('../schema/profile')

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      Profile.User = this.belongsTo(models.User)
      Profile.Invitations = this.hasMany(models.Invitation)
      Profile.Histories = this.hasMany(models.History)
    }
  }
  const { tableAttributes } = profileSchema(sequelize, DataTypes)
  Profile.init(tableAttributes, {
    sequelize,
    modelName: 'Profile'
  })
  return Profile
}
