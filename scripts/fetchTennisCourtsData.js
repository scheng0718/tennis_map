
const axios = require('axios')
const fs = require('fs')
const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '..', '.env') })
const dataPath = path.join(__dirname, '..', 'data', 'tennisCourts.json')
const hereMapApiKey = process.env.HERE_MAP_API_KEY
const BASE_URL = 'https://discover.search.hereapi.com/v1/discover'
const coordinate = '37.5116726,-122.9993583'
const query = 'tennis+court'
const countryCode = 'countryCode:USA'

async function fetchTennisCourts () {
  try {
    const response = await axios.get(`${BASE_URL}?at=${coordinate}&q=${query}&in=${countryCode}&apiKey=${hereMapApiKey}`)
    if (response.data && response.data.items) {
      fs.writeFileSync(dataPath, JSON.stringify(response.data.items, null, 2))
      console.log('Data fetched and saved successfully')
    } else {
      console.error('No tennis courts data received from the API.')
    }
  } catch (error) {
    console.log('An error occurred: ', error.message)
  }
}

fetchTennisCourts()
