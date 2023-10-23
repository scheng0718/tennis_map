const axios = require('axios')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../', '.env') })
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY

exports.fetchData = async function () {
  const response = await axios.get(`https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=37.5066106,-122.0041785&radius=10000&keyword=Tennis&key=${googleMapsApiKey}`)
  return response
}
