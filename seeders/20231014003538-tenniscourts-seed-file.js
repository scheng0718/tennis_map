'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const uniqueTennisCourtsData = require('../data/addMissingCounty.json')
    const tennisCourtsSeederData = uniqueTennisCourtsData.map(tennisCourt => {
      return {
        court_name: tennisCourt.court_name,
        house_number: tennisCourt.house_number,
        street: tennisCourt.street,
        city: tennisCourt.city,
        county: tennisCourt.county,
        state: tennisCourt.state,
        state_code: tennisCourt.state_code,
        postal_code: tennisCourt.postal_code,
        country_code: tennisCourt.country_code,
        country: tennisCourt.country,
        full_address: tennisCourt.full_address,
        latitude: tennisCourt.latitude,
        longitude: tennisCourt.longitude,
        type_id: 1,
        phone: tennisCourt.phone,
        location: Sequelize.fn('ST_GeomFromText', `POINT(${tennisCourt.longitude} ${tennisCourt.latitude})`),
        created_at: new Date(),
        updated_at: new Date()
      }
    })
    await queryInterface.bulkInsert('TennisCourts', tennisCourtsSeederData, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TennisCourts', null, {})
  }
}
