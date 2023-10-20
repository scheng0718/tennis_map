'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const uniqueTennisCourtsData = [
      {
        court_name: 'Norcal Tennis Academy',
        house_number: '6200',
        street: 'Buena Vista Dr',
        city: 'Newark',
        county: 'Alameda',
        state: 'California',
        state_code: 'CA',
        postal_code: '94560',
        country_code: 'USA',
        country: 'United States',
        full_address: '123 Main St, Sample City, EState, Example Country',
        latitude: 37.51684,
        longitude: -121.9957,
        type_id: 1,
        phone: '+14088965745'
      }
    ]
    const tennisCourtsSeederData = uniqueTennisCourtsData.map(tennisCourt => ({
      ...tennisCourt,
      full_address: `${tennisCourt.house_number} ${tennisCourt.street}, ${tennisCourt.city}, ${tennisCourt.state_code} ${tennisCourt.postal_code}, ${tennisCourt.country_code}`,
      location: Sequelize.fn('ST_GeomFromText', `POINT(${tennisCourt.longitude} ${tennisCourt.latitude})`),
      created_at: new Date(),
      updated_at: new Date()
    }))
    await queryInterface.bulkInsert('TennisCourts', tennisCourtsSeederData, {})
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('TennisCourts', null, {})
  }
}
