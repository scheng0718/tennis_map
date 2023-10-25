const fs = require('fs')
const path = require('path')
const updatedTennisCourtsData = require('../data/addMissingCounty.json')
const outputPath = path.resolve(__dirname, '..', 'data', 'removeInvalidHouseNumbers.json')

function isValidHouseNumber (houseNumber) {
  return !isNaN(houseNumber) && houseNumber
}

async function removeInvalidHouseNumbers () {
  try {
    const cleanedData = updatedTennisCourtsData.filter(tennisCourt => isValidHouseNumber(tennisCourt.house_number))
    fs.writeFileSync(outputPath, JSON.stringify(cleanedData, null, 2), 'utf-8')
    console.log('Invalid house number data is removed. Data saved to removeInvalidHouseNumbers.json')
  } catch (error) {
    console.log('An error occurred: ', error.message)
  }
}

removeInvalidHouseNumbers()
