const fs = require('fs')
const path = require('path')
const updatedTennisCourtsData = require('../data/updatePhoneNumbers.json')
const outputPath = path.resolve(__dirname, '..', 'data', 'addMissingCounty.json')
const googleMapsApi = require('./api/googleMapsApi')

async function addMissingCounty () {
  try {
    const filteredMissingCountyData = updatedTennisCourtsData.filter(tennisCourt => {
      return tennisCourt.county === null && tennisCourt.place_id !== null
    })
    const updatedPromiseCountyData = filteredMissingCountyData.map(async tennisCourt => {
      try {
        const response = await googleMapsApi.fetchDetailPlaceApi(tennisCourt.place_id)
        if (response.data && response.data.result && response.data.result.address_components) {
          const countyComponent = response.data.result.address_components.find(component => {
            return component.types.includes('administrative_area_level_2')
          })
          let county = countyComponent ? countyComponent.long_name : null
          if (county) {
            county = county.replace(' County', '')
          }
          return {
            ...tennisCourt,
            county: county
          }
        }
        return {
          ...tennisCourt,
          county: null
        }
      } catch (error) {
        console.error('Error fetching county data', error)
        return {
          ...tennisCourt,
          county: null
        }
      }
    })
    const updatedCountyData = await Promise.all(updatedPromiseCountyData)
    const unchangedData = updatedTennisCourtsData.filter(tennisCourt => {
      return tennisCourt.county !== null && tennisCourt.place_id === null
    })
    const finalData = [...unchangedData, ...updatedCountyData]
    fs.writeFileSync(outputPath, JSON.stringify(finalData, null, 2), 'utf-8')
    console.log('Missing County data is added. Data saved to addMissingCounty.json')
  } catch (error) {
    console.log('An error occurred: ', error.message)
  }
}

addMissingCounty()
