const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Invitation', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userId1: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    userId2: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    result1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    result2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Invitations',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Invitations_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
