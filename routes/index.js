const express = require('express')
const router = express.Router()
const { apiErrorHandler } = require('../middlewares/error-handler')
const courtController = require('../controllers/court-controller')
const commentController = require('../controllers/comment-controller')
const admin = require('./modules/admin')

router.use('/admin', admin)

router.get('/courts/nearby', courtController.getNearByCourts)
router.get('/courts/map', courtController.getCourtsByMap)
router.get('/courts/:courtId', courtController.getCourt)
router.get('/courts', courtController.getCourts)

router.get('/comments/:courtId', commentController.getCommentsByCourt)

router.use('/', apiErrorHandler)

module.exports = router
