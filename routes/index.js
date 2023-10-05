const express = require('express')
const router = express.Router()
const { apiErrorHandler } = require('../middlewares/error-handler')
const admin = require('./modules/admin')

router.use('/admin', admin)
router.use('/', apiErrorHandler)

module.exports = router
