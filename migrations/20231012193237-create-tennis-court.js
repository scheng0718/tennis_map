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
      house_number: {
        type: Sequelize.STRING(50)
      },
      street: {
        type: Sequelize.STRING(255)
      },
      city: {
        type: Sequelize.STRING(100)
      },
      county: {
        type: Sequelize.STRING(100)
      },
      state: {
        type: Sequelize.STRING(100)
      },
      state_code: {
        type: Sequelize.STRING(50)
      },
      postal_code: {
        type: Sequelize.STRING(50)
      },
      country_code: {
        type: Sequelize.STRING(50)
      },
      country: {
        type: Sequelize.STRING(100)
      },
      full_address: {
        type: Sequelize.TEXT
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
      location: {
        type: Sequelize.GEOMETRY('POINT', 4326)
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
