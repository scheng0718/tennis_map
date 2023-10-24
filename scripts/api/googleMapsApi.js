const axios = require('axios')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../', '.env') })
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY

async function fetchTextSearchApi () {
  const response = await axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=tennis+court%20&radius=20000&location=37.5116726%2C-121.9993583&language=en&key=${googleMapsApiKey}`)
  return response
}

async function fetchDetailPlaceApi (placeId) {
  const response = await axios.get(`https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,formatted_phone_number,address_components&key=${googleMapsApiKey}`)
  return response
}

module.exports = {
  fetchTextSearchApi,
  fetchDetailPlaceApi
}
