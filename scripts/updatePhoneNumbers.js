const fs = require('fs')
const path = require('path')
const integratedTennisCourtsData = require('../data/integratedTennisCourts.json')
const outputPath = path.resolve(__dirname, '..', 'data', 'updatePhoneNumbers.json')
const googleMapsApi = require('./api/googleMapsApi')

async function updatePhoneNumbers () {
  const filteredMissingPhoneData = integratedTennisCourtsData.filter(tennisCourt => {
    return tennisCourt.phone === null && tennisCourt.place_id !== null
  })
  const updatedPromisePhoneData = filteredMissingPhoneData.map(async tennisCourt => {
    try {
      const response = await googleMapsApi.fetchDetailPlaceApi(tennisCourt.place_id)
      if (response.data && response.data.result && response.data.result.formatted_phone_number) {
        const phone = response.data.result.formatted_phone_number
        const digitPhoneNumber = phone.replace(/\D/g, '')
        const formattedPhone = `+1${digitPhoneNumber}`
        return {
          ...tennisCourt,
          phone: formattedPhone
        }
      }
      return {
        ...tennisCourt,
        phone: null
      }
    } catch (error) {
      console.error('Error fetching phone number', error)
      return {
        ...tennisCourt,
        phone: null
      }
    }
  })
  const updatedPhoneData = await Promise.all(updatedPromisePhoneData)
  const unchangedData = integratedTennisCourtsData.filter(tennisCourt => {
    return tennisCourt.phone !== null && tennisCourt.place_id === null
  })
  const finalData = [...unchangedData, ...updatedPhoneData]
  fs.writeFileSync(outputPath, JSON.stringify(finalData, null, 2), 'utf-8')
  console.log('Missing Phone data is updated. Updated data saved to updatePhoneNumbers.json')
}

updatePhoneNumbers()
