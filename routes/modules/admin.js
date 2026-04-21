const express = require('express')
const router = express.Router()
const adminController = require('../../controllers/admin-controller')

router.get('/courts', adminController.getCourts)
router.post('/courts', adminController.createCourt)
router.put('/courts/:courtId', adminController.updateCourt)
router.delete('/courts/:courtId', adminController.deleteCourt)

router.get('/users', adminController.getUsers)
router.delete('/users/:userId', adminController.deleteUser)

router.get('/comments', adminController.getComments)
router.delete('/comments/:commentId', adminController.deleteComment)

module.exports = router
