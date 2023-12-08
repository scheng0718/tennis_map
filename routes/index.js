const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')
const courtController = require('../controllers/court-controller')
const commentController = require('../controllers/comment-controller')
const navigationController = require('../controllers/navigation-controller')
const admin = require('./modules/admin')
const { authenticated, authenticatedAdmin } = require('../middlewares/auth')
const { apiErrorHandler } = require('../middlewares/error-handler')

router.use('/admin', authenticated, authenticatedAdmin, admin)

router.get('/courts/search', authenticated, courtController.getCourtsBySearch)
router.get('/courts/nearby', authenticated, courtController.getNearByCourts)
router.get('/courts/map', authenticated, courtController.getCourtsByMap)
router.get('/courts/:courtId', authenticated, courtController.getCourt)
router.get('/courts', authenticated, courtController.getCourts)

router.get('/comments/:courtId', authenticated, commentController.getCommentsByCourt)

router.get('/navigation/:courtId', authenticated, navigationController.getDirection)

router.post('/signUp', userController.signUp)

router.use('/', apiErrorHandler)

module.exports = router
