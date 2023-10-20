'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const courtTypeData = ['Hard', 'Clay', 'Grass', 'Artificial Grass', 'Carpet']
    const courtTypeSeederData = courtTypeData.map(type => ({
      type: type,
      created_at: new Date(),
      updated_at: new Date()
    }))
    await queryInterface.bulkInsert('Types', courtTypeSeederData, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Types', null, {})
  }
}
