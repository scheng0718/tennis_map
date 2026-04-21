const { TennisCourt, User, Comment, Type } = require('../models')
const { Sequelize } = require('sequelize')

const adminServices = {
  getCourts: async (req, cb) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const offset = (page - 1) * limit
    try {
      const { count, rows } = await TennisCourt.findAndCountAll({
        include: [Type],
        limit,
        offset,
        order: [['courtId', 'ASC']]
      })
      return cb(null, { total: count, page, courts: rows })
    } catch (err) {
      cb(err)
    }
  },
  createCourt: async (req, cb) => {
    const { courtName, houseNumber, street, city, county, state, stateCode,
      postalCode, countryCode, country, fullAddress, latitude, longitude, typeId, phone } = req.body
    try {
      if (!courtName || !latitude || !longitude) {
        return cb(Object.assign(new Error('courtName, latitude, longitude are required'), { status: 400 }))
      }
      const lat = parseFloat(latitude)
      const lng = parseFloat(longitude)
      if (isNaN(lat) || isNaN(lng)) {
        return cb(Object.assign(new Error('Invalid coordinates'), { status: 400 }))
      }
      const court = await TennisCourt.create({
        courtName, houseNumber, street, city, county, state, stateCode,
        postalCode, countryCode, country, fullAddress, latitude: lat, longitude: lng,
        typeId: typeId || 1, phone,
        location: Sequelize.fn('ST_GeomFromText', `POINT(${lng} ${lat})`, 4326)
      })
      return cb(null, { court })
    } catch (err) {
      cb(err)
    }
  },
  updateCourt: async (req, cb) => {
    const courtId = req.params.courtId
    const { courtName, houseNumber, street, city, county, state, stateCode,
      postalCode, countryCode, country, fullAddress, latitude, longitude, typeId, phone } = req.body
    try {
      const court = await TennisCourt.findByPk(courtId)
      if (!court) return cb(Object.assign(new Error('Court not found'), { status: 404 }))

      const updates = { courtName, houseNumber, street, city, county, state, stateCode,
        postalCode, countryCode, country, fullAddress, typeId, phone }

      if (latitude !== undefined && longitude !== undefined) {
        const lat = parseFloat(latitude)
        const lng = parseFloat(longitude)
        if (isNaN(lat) || isNaN(lng)) {
          return cb(Object.assign(new Error('Invalid coordinates'), { status: 400 }))
        }
        updates.latitude = lat
        updates.longitude = lng
        updates.location = Sequelize.fn('ST_GeomFromText', `POINT(${lng} ${lat})`, 4326)
      }

      Object.keys(updates).forEach(k => updates[k] === undefined && delete updates[k])
      await court.update(updates)
      return cb(null, { court })
    } catch (err) {
      cb(err)
    }
  },
  deleteCourt: async (req, cb) => {
    const courtId = req.params.courtId
    try {
      const court = await TennisCourt.findByPk(courtId)
      if (!court) return cb(Object.assign(new Error('Court not found'), { status: 404 }))
      await court.destroy()
      return cb(null, { message: 'Court deleted' })
    } catch (err) {
      cb(err)
    }
  },
  getUsers: async (req, cb) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const offset = (page - 1) * limit
    try {
      const { count, rows } = await User.findAndCountAll({
        attributes: { exclude: ['password'] },
        limit,
        offset,
        order: [['userId', 'ASC']]
      })
      return cb(null, { total: count, page, users: rows })
    } catch (err) {
      cb(err)
    }
  },
  deleteUser: async (req, cb) => {
    const userId = req.params.userId
    try {
      const user = await User.findByPk(userId)
      if (!user) return cb(Object.assign(new Error('User not found'), { status: 404 }))
      if (user.role === 'admin') {
        return cb(Object.assign(new Error('Cannot delete admin user'), { status: 403 }))
      }
      await user.destroy()
      return cb(null, { message: 'User deleted' })
    } catch (err) {
      cb(err)
    }
  },
  getComments: async (req, cb) => {
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const offset = (page - 1) * limit
    try {
      const { count, rows } = await Comment.findAndCountAll({
        include: [
          { model: User, attributes: { exclude: ['password'] } },
          { model: TennisCourt, attributes: ['courtId', 'courtName'] }
        ],
        limit,
        offset,
        order: [['commentId', 'DESC']]
      })
      return cb(null, { total: count, page, comments: rows })
    } catch (err) {
      cb(err)
    }
  },
  deleteComment: async (req, cb) => {
    const commentId = req.params.commentId
    try {
      const comment = await Comment.findByPk(commentId)
      if (!comment) return cb(Object.assign(new Error('Comment not found'), { status: 404 }))
      await comment.destroy()
      return cb(null, { message: 'Comment deleted' })
    } catch (err) {
      cb(err)
    }
  }
}

module.exports = adminServices
