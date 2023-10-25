'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const uniqueTennisCourtsData = require('../data/removeInvalidHouseNumbers.json')
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

    const threshold = 0.0009

    // De-duplicate based on the full address first (keeping the more complete information)
    const deduplicateByAddress = `
      DELETE FROM "TennisCourts" a
      USING "TennisCourts" b
      WHERE
        a.court_id < b.court_id AND 
        a.full_address = b.full_address AND
        LENGTH(a.court_name) < LENGTH(b.court_name)
    `
    await queryInterface.sequelize.query(deduplicateByAddress)

    // Then, de-duplicate by geolocation if they are within 100 meters of each other
    const deduplicateByLocation = `
      DELETE FROM "TennisCourts" a
      USING "TennisCourts" b
      WHERE
        a.court_id < b.court_id AND 
        LENGTH(a.court_name) < LENGTH(b.court_name) AND 
        ST_DWithin(a.location, b.location, ${threshold})
    `
    await queryInterface.sequelize.query(deduplicateByLocation)
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TennisCourts', null, {})
  }
}
