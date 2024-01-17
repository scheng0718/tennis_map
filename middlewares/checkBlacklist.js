const redisClient = require('../config/redisConfig')

async function isTokenBlacklisted (token) {
  try {
    const result = await redisClient.get(token)
    return result === 'blacklisted'
  } catch (err) {
    console.error(err)
    return false
  }
}

module.exports = { isTokenBlacklisted }
