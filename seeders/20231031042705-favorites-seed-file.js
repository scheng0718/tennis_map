'use strict'
// const { faker } = require('@faker-js/faker')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const courts = await queryInterface.sequelize.query('SELECT court_id FROM "TennisCourts"', { type: queryInterface.sequelize.QueryTypes.SELECT })

    const users = await queryInterface.sequelize.query('SELECT user_id FROM "Users" WHERE name <> \'root\'', { type: queryInterface.sequelize.QueryTypes.SELECT })

    const favoriteSeederData = users.flatMap(user => {
      const randomCourts = shuffleArray(courts).slice(0, 5)
      return randomCourts.flatMap(court => ({
        user_id: user.user_id,
        court_id: court.court_id,
        created_at: new Date(),
        updated_at: new Date()
      }))
    })
    await queryInterface.bulkInsert('Favorites', favoriteSeederData, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Favorites', null, {})
  }
}

function shuffleArray (array) {
  let currentIndex = array.length
  let randomIndex
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex--
    const temp = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temp
  }
  return array
}
