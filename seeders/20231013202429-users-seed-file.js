'use strict'
const bcrypt = require('bcryptjs')
const { faker } = require('@faker-js/faker')
const saltRounds = 10
const myPlaintextPassword = '12341qaz'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const uniqueUserData = [
      { name: 'root', username: 'root', email: 'root@example.com', role: 'admin', avatar: 'https://i.imgur.com/XPS6aDJ.jpg' },
      { name: 'user1', username: 'user1', email: 'user1@example.com', role: 'user', avatar: 'https://i.imgur.com/vHIZCe7.jpg' },
      { name: 'user2', username: 'user2', email: 'user2@example.com', role: 'user', avatar: 'https://i.imgur.com/kHoi4uC.jpg' },
      { name: 'user3', username: 'user3', email: 'user3@example.com', role: 'user', avatar: 'https://i.imgur.com/3vLgaeO.jpg' },
      { name: 'user4', username: 'user4', email: 'user4@example.com', role: 'user', avatar: 'https://i.imgur.com/HzWQnp1.jpg' },
      { name: 'user5', username: 'user5', email: 'user5@example.com', role: 'user', avatar: 'https://i.imgur.com/nGCnf3D.jpg' },
      { name: 'user6', username: 'user6', email: 'user6@example.com', role: 'user', avatar: 'https://i.imgur.com/87tdzO7.jpg' },
      { name: 'user7', username: 'user7', email: 'user7@example.com', role: 'user', avatar: 'https://i.imgur.com/9z1Wu73.jpg' },
      { name: 'user8', username: 'user8', email: 'user8@example.com', role: 'user', avatar: 'https://i.imgur.com/1EPVJ3o.jpg' },
      { name: 'user9', username: 'user9', email: 'user9@example.com', role: 'user', avatar: 'https://i.imgur.com/DZKbr47.jpg' },
      { name: 'user10', username: 'user10', email: 'user10@example.com', role: 'user', avatar: 'https://i.imgur.com/eS7tw1h.jpg' }
    ]
    const userPromiseData = uniqueUserData.map(async userData => ({
      ...userData,
      password: await bcrypt.hash(myPlaintextPassword, saltRounds),
      introduction: faker.lorem.sentence(),
      created_at: new Date(),
      updated_at: new Date()
    }))
    const userSeederData = await Promise.all(userPromiseData)
    await queryInterface.bulkInsert('Users', userSeederData, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {})
  }
}
