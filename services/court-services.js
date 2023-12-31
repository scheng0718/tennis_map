const { Comment, TennisCourt, Type, User } = require('../models')
const { Sequelize, Op } = require('sequelize')

const courtServices = {
  getCourts: async (req, cb) => {
    try {
      const tennisCourts = await TennisCourt.findAll({ raw: true })
      return cb(null, tennisCourts)
    } catch (err) {
      cb(err)
    }
  },
  getCourt: async (req, cb) => {
    const id = req.params.courtId
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit
    try {
      const tennisCourt = await TennisCourt.findByPk(id, {
        include: [
          Type,
          {
            model: Comment,
            include: User,
            limit: limit,
            offset: offset
          },
          {
            model: User,
            as: 'FavoritedUsers',
            attributes: { exclude: ['password'] }
          }
        ]
      })
      return cb(null, { tennisCourt })
    } catch (err) {
      cb(err)
    }
  },
  getCourtsByMap: async (req, cb) => {
    const minLat = parseFloat(req.query.minLat)
    const maxLat = parseFloat(req.query.maxLat)
    const minLng = parseFloat(req.query.minLng)
    const maxLng = parseFloat(req.query.maxLng)
    try {
      const tennisCourts = await TennisCourt.findAll({
        where: {
          latitude: {
            [Op.between]: [minLat, maxLat]
          },
          longitude: {
            [Op.between]: [minLng, maxLng]
          }
        },
        raw: true
      })
      return cb(null, { tennisCourts })
    } catch (err) {
      cb(err)
    }
  },
  getNearByCourts: async (req, cb) => {
    const userLat = parseFloat(req.query.latitude)
    const userLng = parseFloat(req.query.longitude)
    const radius = parseFloat(req.query.radius)
    try {
      const tennisCourts = await TennisCourt.findAll({
        where: Sequelize.where(
          Sequelize.fn(
            'ST_DistanceSpheroid',
            Sequelize.fn('ST_MakePoint', userLng, userLat),
            Sequelize.fn('ST_MakePoint', Sequelize.col('longitude'), Sequelize.col('latitude'))
          ),
          '<=',
          radius * 1000
        ),
        raw: true
      })
      return cb(null, { tennisCourts })
    } catch (err) {
      cb(err)
    }
  },
  getCourtsBySearch: async (req, cb) => {
    const { cityName, stateCode, postalCode } = req.query
    const whereCondition = {}
    if (!cityName && !stateCode && !postalCode) {
      return cb(null, { message: 'Please provide at least one condition' })
    }
    if (cityName) {
      whereCondition.city = cityName
    }
    if (stateCode) {
      whereCondition.stateCode = stateCode
    }
    if (postalCode) {
      whereCondition.postalCode = {
        [Op.like]: `${postalCode}%`
      }
    }
    try {
      const tennisCourts = await TennisCourt.findAll({
        where: whereCondition,
        raw: true
      })
      return cb(null, { tennisCourts })
    } catch (err) {
      cb(err)
    }
  }
}

module.exports = courtServices
