var DataTypes = require("sequelize").DataTypes;
var _AuthenticityToken = require("./authenticity_token");
var _SequelizeMetum = require("./sequelize_metum");
var _TodoItem = require("./todo_item");
var _Todo = require("./todo");
var _User = require("./user");

function initModels(sequelize) {
  var AuthenticityToken = _AuthenticityToken(sequelize, DataTypes);
  var SequelizeMetum = _SequelizeMetum(sequelize, DataTypes);
  var TodoItem = _TodoItem(sequelize, DataTypes);
  var Todo = _Todo(sequelize, DataTypes);
  var User = _User(sequelize, DataTypes);


  return {
    AuthenticityToken,
    SequelizeMetum,
    TodoItem,
    Todo,
    User,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
