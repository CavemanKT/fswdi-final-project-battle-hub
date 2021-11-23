const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Profile', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    characterName: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    gameTitle: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    weapon: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    amulet: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    armour: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    boots: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    img1: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    img2: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    video: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Profiles',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Profiles_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
