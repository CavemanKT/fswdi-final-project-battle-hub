'use strict';

const bcrypt = require("bcrypt")

const { Faker } = require('fakergem')
const { Application, Developer, Talent, Game, Image } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {

    // creating accounts
    await Developer.destroy({truncate: true})

    for ( var i = 0; i < 10; i++) {
      const user = await Developer.build({
        type: 'Developer',
        email: Faker.Internet.email(),
        firstName: Faker.Name.firstName(),
        lastName: Faker.Name.lastName(),
        username: Faker.Internet.userName(),
      })
      user.passwordHash = await bcrypt.hash('123456', 10)
      user.save()

      await Game.create({
        name: Faker.Name.nameWithMiddle(),
        description: Faker.Name.nameWithMiddle(),
        jobDescription: Faker.Name.nameWithMiddle(),
        qualification: Faker.Name.nameWithMiddle(),
        DeveloperId: i + 1
      })
      await Image.create({
        GameId: i + 1,
        url1: Faker.LoremFlickr.image('600x500', ['MMORPG']),
        url2: Faker.LoremFlickr.image('600x500', ['MMORPG']),
        url3: Faker.LoremFlickr.image('600x500', ['MMORPG'])
      })
    }

    for ( var i = 0; i < 10; i++) {
      const user = await Talent.build({
        type: 'Marketer',
        email: Faker.Internet.email(),
        firstName: Faker.Name.firstName(),
        lastName: Faker.Name.lastName(),
        username: Faker.Internet.userName(),
      })
      user.passwordHash = await bcrypt.hash('123456', 10)
      user.save()

    }



  }
};
