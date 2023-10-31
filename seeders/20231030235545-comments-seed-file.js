'use strict'
const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const courts = await queryInterface.sequelize.query('SELECT court_id from "TennisCourts"', { type: queryInterface.sequelize.QueryTypes.SELECT })
    const users = await queryInterface.sequelize.query('SELECT user_id from "Users" WHERE name <> \'root\'', { type: queryInterface.sequelize.QueryTypes.SELECT })

    const updatedComments = users.flatMap(user => {
      return Array.from({ length: 10 }, () => ({
        user_id: user.user_id,
        court_id: courts[Math.floor(Math.random() * courts.length)].court_id,
        comment: faker.lorem.text(),
        created_at: new Date(),
        updated_at: new Date()
      }))
    })
    await queryInterface.bulkInsert('Comments', updatedComments, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Comments', null, {})
  }
}
