'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const uniqueTennisCourtsData = require('../data/tennisCourts.json')
    const tennisCourtsSeederData = uniqueTennisCourtsData.map(tennisCourt => {
      const phoneContact = tennisCourt.contacts ? tennisCourt.contacts.find(contact => contact.phone && contact.phone.length > 0) : null
      const phone = phoneContact ? phoneContact.phone[0].value : null
      return {
        court_name: tennisCourt.title,
        house_number: tennisCourt.address.houseNumber,
        street: tennisCourt.address.street,
        city: tennisCourt.address.city,
        county: tennisCourt.address.county,
        state: tennisCourt.address.state,
        state_code: tennisCourt.address.stateCode,
        postal_code: tennisCourt.address.postalCode,
        country_code: tennisCourt.address.countryCode,
        country: tennisCourt.address.countryName,
        full_address: `${tennisCourt.address.houseNumber} ${tennisCourt.address.street}, ${tennisCourt.address.city}, ${tennisCourt.address.stateCode} ${tennisCourt.address.postalCode}, ${tennisCourt.address.countryCode}`,
        latitude: tennisCourt.position.lat,
        longitude: tennisCourt.position.lng,
        type_id: 1,
        phone: phone,
        location: Sequelize.fn('ST_GeomFromText', `POINT(${tennisCourt.position.lng} ${tennisCourt.position.lat})`),
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
