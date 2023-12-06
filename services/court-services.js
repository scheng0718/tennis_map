const { Comment, TennisCourt, Type, User } = require('../models')
const { Op } = require('sequelize')

const courtServices = {
  getCourts: (req, cb) => {
    return TennisCourt.findAll({ raw: true })
      .then(tennisCourts => {
        return cb(null, {
          tennisCourts
        })
      })
      .catch(err => cb(err))
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
  }
}

module.exports = courtServices
