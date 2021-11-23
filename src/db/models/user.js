const { Model } = require('sequelize')
const UserSchema = require('../schema/user')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.AuthenticityTokens = this.hasMany(models.AuthenticityToken, { onDelete: 'CASCADE', hooks: true })
      User.Profile = this.hasOne(models.Profile)
      User.Invitations = this.hasMany(models.Invitation)
      User.History = this.hasOne(models.History)
    }
  }

  const { tableAttributes } = UserSchema(sequelize, DataTypes)
  User.init(tableAttributes, {
    sequelize,
    modelName: 'User'
  })
  return User
}
