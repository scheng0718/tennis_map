'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const courtTypeData = ['public', 'private', 'membership', 'school']
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
