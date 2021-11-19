const bcrypt = require('bcrypt')

const { User } = require('../models')

module.exports = {
  up: async () => {
    await User.destroy({ truncate: true })
    const passwordHash = await bcrypt.hash('123456', 10)
    await User.create({
      name: 'Tester',
      email: 'test@test.com',
      passwordHash
    })
  }
}
