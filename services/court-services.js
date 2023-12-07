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
  getCourt: (req, cb) => {
    const id = req.params.courtId
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 10
    const offset = (page - 1) * limit
    return TennisCourt.findByPk(id, {
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
      .then(tennisCourt => {
        return cb(null, { tennisCourt })
      })
      .catch(err => cb(err))
  },
  getCourtsByMap: (req, cb) => {
    const minLat = parseFloat(req.query.minLat)
    const maxLat = parseFloat(req.query.maxLat)
    const minLng = parseFloat(req.query.minLng)
    const maxLng = parseFloat(req.query.maxLng)

    return TennisCourt.findAll({
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
      .then(tennisCourts => {
        return cb(null, {
          tennisCourts
        })
      })
      .catch(err => cb(err))
  },
  getNearByCourts: (req, cb) => {
    const userLat = parseFloat(req.query.latitude)
    const userLng = parseFloat(req.query.longitude)
    const radius = parseFloat(req.query.radius)

    return TennisCourt.findAll({
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
      .then(tennisCourts => {
        return cb(null, { tennisCourts })
      })
      .catch(err => cb(err))
  },
  getCourtsBySearch: (req, cb) => {
    const { cityName, stateCode, postalCode } = req.query
    if (!cityName && !stateCode && !postalCode) {
      return cb(null, { message: 'Please provide at least one condition' })
    }
    const whereCondition = {}
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

    TennisCourt.findAll({
      where: whereCondition,
      raw: true
    })
      .then(tennisCourts => {
        return cb(null, { tennisCourts })
      })
      .catch(err => cb(err))
  }
}

module.exports = courtServices
