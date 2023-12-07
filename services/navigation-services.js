const { TennisCourt } = require('../models')
const axios = require('axios')
const googleMapsApiKey = process.env.GOOGLE_MAPS_API_KEY

const navigationServices = {
  getDirection: async (req, cb) => {
    const courtId = req.params.courtId
    const userLat = parseFloat(req.query.latitude)
    const userLng = parseFloat(req.query.longitude)
    const userLocation = `${userLat}, ${userLng}`

    try {
      const tennisCourt = await TennisCourt.findByPk(courtId)
      if (!tennisCourt) {
        return cb(null, { message: 'Tennis Court does not exist!' })
      }
      const courtLocation = `${tennisCourt.latitude},${tennisCourt.longitude}`
      const route = await calculateRoute(userLocation, courtLocation)
      cb(null, route)
    } catch (err) {
      cb(err)
    }
  }
}
async function calculateRoute (start, end) {
  try {
    const response = await axios.get(`https://maps.googleapis.com/maps/api/directions/json?origin=${start}&destination=${end}&key=${googleMapsApiKey}`)
    return response.data
  } catch (err) {
    throw new Error('Error calculating route')
  }
}

module.exports = navigationServices
