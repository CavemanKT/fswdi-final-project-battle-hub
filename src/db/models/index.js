const fs = require('fs')
const Sequelize = require('sequelize')

const basename = 'index.js'
const env = process.env.NODE_ENV || 'development'
const config = require('../config/database.json')[env]

const db = {}

let sequelize
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs
  .readdirSync(`${process.cwd()}/src/db/models`)
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    /* eslint-disable */
    const model = require(`../models/${file}`)(sequelize, Sequelize.DataTypes)
    /* eslint-enable */
    db[model.name] = model
  })

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
