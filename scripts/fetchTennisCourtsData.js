const fs = require('fs')
const path = require('path')
const hereApiDataPath = path.join(__dirname, '..', 'data', 'hereApiTennisCourts.json')
const googleMapsApiDataPath = path.join(__dirname, '..', 'data', 'googleMapsApiTennisCourts.json')
const hereApi = require('./api/hereApi')
const googleMapsApi = require('./api/googleMapsApi')

async function saveData (apiFunction, path, keyName) {
  try {
    const response = await apiFunction
    if (response.data && response.data[keyName]) {
      fs.writeFileSync(path, JSON.stringify(response.data[keyName], null, 2))
      console.log('Data fetched and saved successfully')
    } else {
      console.error('No tennis courts data received from the API')
    }
  } catch (error) {
    console.log('An error occurred: ', error.message)
  }
}

async function fetchTennisCourts () {
  await saveData(hereApi.fetchData(), hereApiDataPath, 'items')
  await saveData(googleMapsApi.fetchData(), googleMapsApiDataPath, 'results')
}

fetchTennisCourts()
