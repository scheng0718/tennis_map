const axios = require('axios')
const path = require('path')
require('dotenv').config({ path: path.join(__dirname, '../../', '.env') })
const hereMapApiKey = process.env.HERE_MAP_API_KEY

exports.fetchData = async function () {
  const response = await axios.get(`https://discover.search.hereapi.com/v1/discover?at=37.5116726,-121.9993583&q=tennis+court&apiKey=${hereMapApiKey}`)
  return response
}
