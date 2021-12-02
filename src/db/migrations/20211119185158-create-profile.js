module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Profiles', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      characterName: {
        type: Sequelize.STRING
      },
      gameTitle: {
        type: Sequelize.STRING
      },
      weapon: {
        type: Sequelize.STRING
      },
      amulet: {
        type: Sequelize.STRING
      },
      armour: {
        type: Sequelize.STRING
      },
      boots: {
        type: Sequelize.STRING
      },
      thumbnail: {
        type: Sequelize.STRING
      },
      img1: {
        type: Sequelize.STRING
      },
      img2: {
        type: Sequelize.STRING
      },
      img3: {
        type: Sequelize.STRING
      },
      video: {
        type: Sequelize.STRING
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Profiles')
  }
}
