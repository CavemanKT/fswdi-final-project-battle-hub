const {
  Model
} = require('sequelize')
const historySchema = require('../schema/history')

module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
      History.Profile = this.belongsTo(models.Profile)
    }
  }
  const { tableAttributes } = historySchema(sequelize, DataTypes)
  History.init(tableAttributes, {
    sequelize,
    modelName: 'History'
  })
  return History
}
