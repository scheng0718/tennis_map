'use strict'
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('TennisCourts', {
      court_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },
      court_name: {
        type: Sequelize.STRING(100)
      },
      street_1: {
        type: Sequelize.STRING(255)
      },
      street_2: {
        type: Sequelize.STRING(255)
      },
      city: {
        type: Sequelize.STRING(100)
      },
      state_or_province: {
        type: Sequelize.STRING(100)
      },
      country: {
        type: Sequelize.STRING(100)
      },
      zip_code: {
        type: Sequelize.STRING(50)
      },
      latitude: {
        type: Sequelize.DOUBLE
      },
      longitude: {
        type: Sequelize.DOUBLE
      },
      type_id: {
        type: Sequelize.SMALLINT
      },
      phone: {
        type: Sequelize.STRING(100)
      },
      email: {
        type: Sequelize.STRING(255)
      },
      description: {
        type: Sequelize.TEXT
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('TennisCourts')
  }
}
