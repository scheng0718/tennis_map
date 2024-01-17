const redis = require('redis')

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST || 'localhost',
  port: process.env.REDIS_PORT || 6379,
  password: process.env.REDIS_PASSWORD || ''
})

redisClient.connect().catch(err => console.error('Redis connection error', err))
redisClient.on('error', err => console.log('Redis Client Error', err))

module.exports = redisClient
