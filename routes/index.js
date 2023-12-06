const express = require('express')
const router = express.Router()
const { apiErrorHandler } = require('../middlewares/error-handler')
const courtController = require('../controllers/court-controller')
const admin = require('./modules/admin')

router.use('/admin', admin)
router.get('/courts/:courtId', courtController.getCourt)
router.get('/courts', courtController.getCourts)
router.use('/', apiErrorHandler)

module.exports = router
