const fs = require('fs')
const path = require('path')
const outputPath = path.resolve(__dirname, '..', 'data', 'integratedTennisCourts.json')
const hereApiData = require('../data/hereApiTennisCourts.json')
const googleMapsApiData = require('../data/googleMapsApiTennisCourts.json')

function integrateApiData (hereApiData, googleMapsApiData) {
  const formattedHereApiData = hereApiData.map(tennisCourt => {
    const phoneContact = tennisCourt.contacts ? tennisCourt.contacts.find(contact => contact.phone && contact.phone.length > 0) : null
    const phone = phoneContact ? phoneContact.phone[0].value : null
    return {
      court_name: tennisCourt.title ?? null,
      house_number: tennisCourt.address.houseNumber ?? null,
      street: tennisCourt.address.street ?? null,
      city: tennisCourt.address.city ?? null,
      county: tennisCourt.address.county ?? null,
      state: tennisCourt.address.state ?? null,
      state_code: tennisCourt.address.stateCode ?? null,
      postal_code: tennisCourt.address.postalCode ?? null,
      country_code: tennisCourt.address.countryCode ?? null,
      country: tennisCourt.address.countryName ?? null,
      full_address: `${tennisCourt.address.houseNumber} ${tennisCourt.address.street}, ${tennisCourt.address.city}, ${tennisCourt.address.stateCode} ${tennisCourt.address.postalCode}, ${tennisCourt.address.countryCode}`,
      latitude: tennisCourt.position.lat ?? null,
      longitude: tennisCourt.position.lng ?? null,
      type_id: 1,
      phone: phone ?? null,
      place_id: null
    }
  })
  const formattedGoogleApiData = googleMapsApiData.map(tennisCourt => {
    const addressParts = tennisCourt.formatted_address.split(', ')
    const streetParts = addressParts[0].split(' ')
    const houseNumber = streetParts[0]
    const street = streetParts.slice(1).join(' ')
    const city = addressParts[1]
    const stateAndPostalCode = addressParts[2].split(' ')
    const state = stateAndPostalCode[0]
    const postalCode = stateAndPostalCode[1]
    const country = addressParts[3]

    return {
      court_name: tennisCourt.name ?? null,
      house_number: houseNumber ?? null,
      street: street ?? null,
      city: city ?? null,
      county: null,
      state: 'California',
      state_code: state ?? null,
      postal_code: postalCode ?? null,
      country_code: 'USA',
      country: country ?? null,
      full_address: tennisCourt.formatted_address ?? null,
      latitude: tennisCourt.geometry.location.lat ?? null,
      longitude: tennisCourt.geometry.location.lng ?? null,
      type_id: 1,
      phone: null,
      place_id: tennisCourt.place_id ?? null
    }
  })
  const integratedData = [...formattedHereApiData, ...formattedGoogleApiData]
  return integratedData
}
const integratedData = integrateApiData(hereApiData, googleMapsApiData)
fs.writeFileSync(outputPath, JSON.stringify(integratedData, null, 2), 'utf-8')
console.log('Data integration complete. Integrated data saved to integratedTennisCourts.json')
