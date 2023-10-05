const express = require('express')
const router = express.Router()
const apis = require('./apis')

router.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = {
  apis,
  router
}
